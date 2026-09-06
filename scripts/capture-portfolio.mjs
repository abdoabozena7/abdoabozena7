import { chromium } from "playwright";
import ffmpegPackagePath from "ffmpeg-static";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const PROFILE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORTFOLIO_URL =
  process.env.PORTFOLIO_URL ??
  "https://abdoabozena7.github.io/3d_scroll_portoflio/";
const OUTPUT_DIR = path.join(PROFILE_ROOT, "assets", "portfolio-preview");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "portfolio-preview.webp");
const VIEWPORT = { width: 1280, height: 800 };
const POSTER_LEAD_SECONDS = 1;
const HERO_POSTER_SECONDS = 5;
const MODEL_SETTLE_MS = 15_000;
const SHOWCASE_SETTLE_MS = 2_500;
const HERO_SETTLE_MS = 5_000;
const SCREENSHOT_TIMEOUT_MS = 60_000;
const MODEL_ASSETS = [
  "dalithe_persistence_of_memory.glb",
  "wanderer_above_the_sea_of_fog.glb",
  "window.glb",
];
const MIN_SHOWCASE_SCREENSHOT_BYTES = 120 * 1024;
const MAX_OUTPUT_BYTES = 10 * 1024 * 1024;
const MIN_OUTPUT_BYTES = 100 * 1024;

const ffmpegPath = process.env.FFMPEG_PATH || ffmpegPackagePath;
if (!ffmpegPath) {
  throw new Error("ffmpeg is unavailable; install ffmpeg or set FFMPEG_PATH.");
}

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function runProcess(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      ...options,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
        return;
      }
      const details = stderr.trim().slice(-4000);
      reject(new Error(`${path.basename(command)} exited with code ${code}${details ? `: ${details}` : ""}`));
    });
  });
}

async function runFfmpeg(args) {
  return runProcess(ffmpegPath, args);
}

async function findScrollLayer(page) {
  return page.evaluate(() => {
    const candidates = [...document.querySelectorAll("*")]
      .filter((element) => {
        const style = getComputedStyle(element);
        return (
          style.overflowY === "auto" &&
          element.scrollHeight > element.clientHeight + 20
        );
      })
      .sort((a, b) => b.scrollHeight - a.scrollHeight);

    const foreground = candidates.find(
      (element) => getComputedStyle(element).zIndex === "1",
    );
    const scroller = foreground ?? candidates[0];
    if (!scroller) return null;

    return {
      scrollHeight: scroller.scrollHeight,
      clientHeight: scroller.clientHeight,
      maxScroll: scroller.scrollHeight - scroller.clientHeight,
    };
  });
}

async function setScrollTop(page, target) {
  return page.evaluate((requestedTarget) => {
    const candidates = [...document.querySelectorAll("*")]
      .filter((element) => {
        const style = getComputedStyle(element);
        return (
          style.overflowY === "auto" &&
          element.scrollHeight > element.clientHeight + 20
        );
      })
      .sort((a, b) => b.scrollHeight - a.scrollHeight);
    const foreground = candidates.find(
      (element) => getComputedStyle(element).zIndex === "1",
    );
    const scroller = foreground ?? candidates[0];
    if (!scroller) throw new Error("The portfolio scroll layer was not found.");

    scroller.style.scrollBehavior = "auto";
    const maxScroll = scroller.scrollHeight - scroller.clientHeight;
    scroller.scrollTop = Math.max(0, Math.min(maxScroll, requestedTarget));
    return { scrollTop: scroller.scrollTop, maxScroll };
  }, target);
}

async function animateScroll(page, target, duration) {
  return page.evaluate(
    async ({ target: requestedTarget, duration: animationDuration }) => {
      const candidates = [...document.querySelectorAll("*")]
        .filter((element) => {
          const style = getComputedStyle(element);
          return (
            style.overflowY === "auto" &&
            element.scrollHeight > element.clientHeight + 20
          );
        })
        .sort((a, b) => b.scrollHeight - a.scrollHeight);
      const foreground = candidates.find(
        (element) => getComputedStyle(element).zIndex === "1",
      );
      const scroller = foreground ?? candidates[0];
      if (!scroller) throw new Error("The portfolio scroll layer was not found.");

      const maxScroll = scroller.scrollHeight - scroller.clientHeight;
      const target = Math.max(0, Math.min(maxScroll, requestedTarget));
      const start = scroller.scrollTop;
      const startedAt = performance.now();
      const easeInOut = (progress) =>
        progress < 0.5
          ? 2 * progress * progress
          : 1 - ((-2 * progress + 2) ** 2) / 2;

      scroller.style.scrollBehavior = "auto";
      await new Promise((resolve) => {
        const tick = (now) => {
          const progress = Math.min(1, (now - startedAt) / animationDuration);
          scroller.scrollTop = start + (target - start) * easeInOut(progress);
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            scroller.scrollTop = target;
            resolve();
          }
        };
        requestAnimationFrame(tick);
      });

      return { scrollTop: scroller.scrollTop, maxScroll };
    },
    { target, duration },
  );
}

async function confirmWebGL(page) {
  await page.waitForFunction(
    () => {
      const canvas = [...document.querySelectorAll("canvas")].sort(
        (a, b) => b.width * b.height - a.width * a.height,
      )[0];
      if (!canvas || canvas.width < 500 || canvas.height < 300) return false;
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      return Boolean(gl && !gl.isContextLost());
    },
    undefined,
    { timeout: 45_000 },
  );

  const result = await page.evaluate(() => {
    const canvas = [...document.querySelectorAll("canvas")].sort(
      (a, b) => b.width * b.height - a.width * a.height,
    )[0];
    const gl = canvas?.getContext("webgl2") || canvas?.getContext("webgl");
    if (!canvas || !gl || gl.isContextLost()) return null;

    return {
      canvas: { width: canvas.width, height: canvas.height },
      renderer: gl.getParameter(gl.RENDERER),
      contextLost: gl.isContextLost(),
      drawingBuffer: {
        width: gl.drawingBufferWidth,
        height: gl.drawingBufferHeight,
      },
    };
  });

  if (!result) throw new Error("The portfolio WebGL canvas could not be inspected.");
  return result;
}

async function countAnimatedWebPFrames(filePath) {
  const bytes = await fs.readFile(filePath);
  const marker = Buffer.from("ANMF", "ascii");
  let frames = 0;
  let offset = 0;
  while (true) {
    const index = bytes.indexOf(marker, offset);
    if (index === -1) break;
    frames += 1;
    offset = index + marker.length;
  }
  return frames;
}

async function replaceAtomically(source, destination) {
  const backup = `${destination}.${process.pid}.previous`;
  const hadDestination = await exists(destination);

  try {
    if (hadDestination) await fs.rename(destination, backup);
    await fs.rename(source, destination);
    if (hadDestination) await fs.rm(backup, { force: true });
  } catch (error) {
    await fs.rm(destination, { force: true });
    if (hadDestination && (await exists(backup))) {
      await fs.rename(backup, destination);
    }
    throw error;
  }
}

async function encodeWebP(videoPath, posterPath, trimStartSeconds, stagingDir) {
  const attempts = [
    { width: 1024, fps: 10, quality: 68 },
    { width: 896, fps: 8, quality: 60 },
  ];

  for (const [index, attempt] of attempts.entries()) {
    const candidate = path.join(stagingDir, `portfolio-preview-${index}.webp`);
    await runFfmpeg([
      "-y",
      "-hide_banner",
      "-loglevel",
      "error",
      "-loop",
      "1",
      "-i",
      posterPath,
      "-ss",
      String(trimStartSeconds),
      "-i",
      videoPath,
      "-filter_complex",
      `[0:v]scale=${attempt.width}:-2:flags=lanczos,setsar=1,trim=duration=${HERO_POSTER_SECONDS},setpts=PTS-STARTPTS[poster];[1:v]fps=${attempt.fps},scale=${attempt.width}:-2:flags=lanczos,setsar=1,setpts=PTS-STARTPTS[recording];[poster][recording]concat=n=2:v=1:a=0,fps=${attempt.fps},format=yuv420p[v]`,
      "-map",
      "[v]",
      "-an",
      "-c:v",
      "libwebp",
      "-preset",
      "picture",
      "-compression_level",
      "6",
      "-q:v",
      String(attempt.quality),
      "-loop",
      "0",
      candidate,
    ]);

    const size = (await fs.stat(candidate)).size;
    if (size < MIN_OUTPUT_BYTES) {
      throw new Error(`Animated WebP is unexpectedly small (${size} bytes).`);
    }

    const frames = await countAnimatedWebPFrames(candidate);
    if (frames < 10) {
      throw new Error(`Animated WebP validation found only ${frames} frame(s).`);
    }

    if (size > MAX_OUTPUT_BYTES && index === attempts.length - 1) {
      throw new Error(`Animated WebP exceeds the size limit (${size} bytes).`);
    }

    if (size <= MAX_OUTPUT_BYTES) {
      return {
        candidate,
        size,
        frames,
        width: attempt.width,
        height: Math.round((attempt.width * VIEWPORT.height) / VIEWPORT.width),
        fps: attempt.fps,
      };
    }
  }

  throw new Error("WebP encoding did not produce a usable candidate.");
}

async function main() {
  const stagingDir = await fs.mkdtemp(path.join(PROFILE_ROOT, ".portfolio-preview-tmp-"));
  const videoDir = path.join(stagingDir, "video");
  await fs.mkdir(videoDir, { recursive: true });

  let browser;
  let context;
  let video;
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];

  try {
    browser = await chromium.launch({
      headless: true,
      args: [
        "--use-angle=swiftshader",
        "--enable-unsafe-swiftshader",
        "--disable-dev-shm-usage",
      ],
    });
    const recordingStartedAt = Date.now();
    context = await browser.newContext({
      viewport: VIEWPORT,
      screen: VIEWPORT,
      deviceScaleFactor: 1,
      colorScheme: "dark",
      reducedMotion: "no-preference",
      locale: "en-US",
      recordVideo: { dir: videoDir, size: VIEWPORT },
    });
    const page = await context.newPage();
    video = page.video();
    const modelAssetWaits = MODEL_ASSETS.map((assetName) =>
      page.waitForResponse(
        (response) =>
          response.url().includes(`/models/${assetName}`) && response.ok(),
        { timeout: 60_000 },
      ),
    );
    page.setDefaultTimeout(20_000);
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("requestfailed", (request) => {
      failedRequests.push(`${request.method()} ${request.url()} — ${request.failure()?.errorText ?? "unknown"}`);
    });

    await page.goto(PORTFOLIO_URL, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await page.evaluate(async () => {
      if (document.fonts?.ready) await document.fonts.ready;
    });
    const webgl = await confirmWebGL(page);
    await page.waitForFunction(
      () =>
        [...document.querySelectorAll("*")].some((element) => {
          const style = getComputedStyle(element);
          return (
            style.overflowY === "auto" &&
            style.zIndex === "1" &&
            element.scrollHeight > element.clientHeight + 20
          );
        }),
      undefined,
      { timeout: 45_000 },
    );
    const scrollLayer = await findScrollLayer(page);
    if (!scrollLayer || scrollLayer.maxScroll < 500) {
      throw new Error("The portfolio scroll layer did not expose enough content to capture.");
    }

    // Visit the showcase once before awaiting models so lazy scene loading can start in CI.
    await setScrollTop(page, scrollLayer.maxScroll);
    await Promise.all(modelAssetWaits);
    await sleep(MODEL_SETTLE_MS);

    await setScrollTop(page, 0);
    await page.mouse.move(VIEWPORT.width * 0.28, VIEWPORT.height * 0.34, { steps: 2 });
    await sleep(1_200);
    await setScrollTop(page, scrollLayer.maxScroll);
    await sleep(SHOWCASE_SETTLE_MS);
    const showcaseCheckPath = path.join(stagingDir, "showcase-check.png");
    await page.screenshot({
      path: showcaseCheckPath,
      type: "png",
      animations: "allow",
      timeout: SCREENSHOT_TIMEOUT_MS,
    });
    const showcaseScreenshotBytes = (await fs.stat(showcaseCheckPath)).size;
    if (showcaseScreenshotBytes < MIN_SHOWCASE_SCREENSHOT_BYTES) {
      throw new Error(
        `The loaded GLB showcase screenshot is unexpectedly small (${showcaseScreenshotBytes} bytes).`,
      );
    }
    await setScrollTop(page, 0);
    await sleep(HERO_SETTLE_MS);
    const posterPath = path.join(stagingDir, "hero-poster.png");
    await page.screenshot({
      path: posterPath,
      type: "png",
      animations: "allow",
      timeout: SCREENSHOT_TIMEOUT_MS,
    });
    const trimStartSeconds = Math.max(
      0,
      Number(((Date.now() - recordingStartedAt) / 1_000 - POSTER_LEAD_SECONDS).toFixed(2)),
    );

    const sequence = [
      { progress: 0.24, duration: 4_200, hold: 1_800, pointer: [0.62, 0.42] },
      { progress: 0.52, duration: 5_200, hold: 2_200, pointer: [0.34, 0.58] },
      { progress: 0.75, duration: 5_200, hold: 2_400, pointer: [0.68, 0.34] },
      { progress: 1.00, duration: 6_500, hold: 5_000, pointer: [0.52, 0.36] },
      { progress: 0.00, duration: 7_500, hold: 0, pointer: [0.28, 0.46] },
    ];
    let currentScroll = 0;
    const captureStartedAt = Date.now();

    for (const moment of sequence) {
      await page.mouse.move(
        VIEWPORT.width * moment.pointer[0],
        VIEWPORT.height * moment.pointer[1],
        { steps: 2 },
      );
      const targetScroll = Math.round(scrollLayer.maxScroll * moment.progress);
      await animateScroll(page, targetScroll, moment.duration);
      if (moment.progress === 1) {
        await setScrollTop(page, targetScroll);
        await sleep(500);
      }
      if (moment.progress === 0) {
        await setScrollTop(page, targetScroll);
        await sleep(HERO_SETTLE_MS);
      }
      await sleep(moment.hold);
      currentScroll = targetScroll;
    }
    const captureDurationSeconds = (Date.now() - captureStartedAt) / 1_000;

    if (currentScroll !== 0) throw new Error("The cinematic sequence did not return to the hero.");
    if (!video) throw new Error("Playwright did not create a video recorder.");
    await context.close();
    context = undefined;
    const videoPath = await video.path();
    await browser.close();
    browser = undefined;

    const videoSize = (await fs.stat(videoPath)).size;
    if (videoSize < MIN_OUTPUT_BYTES) {
      throw new Error(`Browser recording is unexpectedly small (${videoSize} bytes).`);
    }

    const encoded = await encodeWebP(videoPath, posterPath, trimStartSeconds, stagingDir);
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    await replaceAtomically(encoded.candidate, OUTPUT_FILE);

    console.log(
      JSON.stringify(
        {
          ok: true,
          portfolioUrl: PORTFOLIO_URL,
          trimStartSeconds,
          showcaseScreenshotBytes,
          captureDurationSeconds: Number(captureDurationSeconds.toFixed(2)),
          outputDurationSeconds: Number((encoded.frames / encoded.fps).toFixed(2)),
          frameRate: encoded.fps,
          frames: encoded.frames,
          width: encoded.width,
          height: encoded.height,
          output: path.relative(PROFILE_ROOT, OUTPUT_FILE).replaceAll(path.sep, "/"),
          outputBytes: encoded.size,
          webgl,
          consoleErrors: consoleErrors.slice(0, 5),
          pageErrors: pageErrors.slice(0, 5),
          failedRequests: failedRequests.slice(0, 5),
        },
        null,
        2,
      ),
    );
  } finally {
    if (context) await context.close().catch(() => {});
    if (browser) await browser.close().catch(() => {});
    await fs.rm(stagingDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(`Portfolio preview generation failed: ${error.stack || error.message}`);
  process.exitCode = 1;
});
