<!-- ====== Color Wave Header ====== -->
![header](https://capsule-render.vercel.app/api?type=waving&height=220&color=0:ff6a00,50:ffd319,100:00d4ff&text=Abdelrahman%20Mohamed&fontColor=ffffff&fontSize=48&fontAlign=50&fontAlignY=35)

<!-- ====== Dynamic Tagline (Typing) ====== -->
<p align="center">
  <svg viewBox="0 0 600 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ff6a00"/>
        <stop offset="50%" stop-color="#ffd319"/>
        <stop offset="100%" stop-color="#00d4ff"/>
      </linearGradient>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');
        text {
          font-family: 'Poppins', sans-serif;
          font-size: 26px;
          fill: url(#grad);
          animation: typing 4s steps(40, end) infinite alternate, blink .7s infinite;
          white-space: nowrap;
          overflow: hidden;
        }
        @keyframes typing {
          from { clip-path: inset(0 100% 0 0); }
          to { clip-path: inset(0 0 0 0); }
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      </style>
    </defs>
    <text x="0" y="60">Code Like a Rockstar</text>
  </svg>
</p>

<!-- ====== Animated Gradient Bar + Bouncing Dot (pure SVG) ====== -->
<p align="center">
  <svg width="800" height="70" viewBox="0 0 800 70">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ff6a00">
          <animate attributeName="stop-color" values="#ff6a00;#ffd319;#00d4ff;#ff6a00" dur="8s" repeatCount="indefinite"/>
        </stop>
        <stop offset="100%" stop-color="#ffd319">
          <animate attributeName="stop-color" values="#ffd319;#00d4ff;#ff6a00;#ffd319" dur="8s" repeatCount="indefinite"/>
        </stop>
      </linearGradient>
    </defs>
    <rect x="0" y="30" width="800" height="10" rx="5" fill="url(#grad1)">
      <animate attributeName="y" values="15;30;15" dur="5s" repeatCount="indefinite"/>
    </rect>
    <circle r="6" fill="#ffffff">
      <animate attributeName="cx" values="0;800;0" dur="6s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="35;20;35" dur="6s" repeatCount="indefinite"/>
    </circle>
  </svg>
</p>

<!-- ====== Compact Skills Icons (colorful) ====== -->
<p align="center">
  <img src="https://skillicons.dev/icons?i=html,css,js,ts,react,nextjs,tailwind,figma,git,github" />
</p>

<!-- ====== Vibrant Chips / Quick Links ====== -->
<!-- ====== Social Links ====== -->
<p align="center">
  <a href="https://wa.me/qr/L4NBPBFEZE2OL1" target="_blank">
    <img src="https://img.shields.io/badge/WhatsApp-Contact-25D366?style=for-the-badge&logo=whatsapp&logoColor=white">
  </a>
  <a href="https://www.instagram.com/abdoabozena1?igsh=OWFjYmt4OXVhNmRv" target="_blank">
    <img src="https://img.shields.io/badge/Instagram-Follow-E4405F?style=for-the-badge&logo=instagram&logoColor=white">
  </a>
  <a href="https://www.linkedin.com/in/YOUR-LINKEDIN" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white">
  </a>
</p>

<!-- ====== Animated Headline (pure SVG, shifting gradient) ====== -->
<p align="center">
  <svg width="900" height="70" viewBox="0 0 900 70">
    <defs>
      <linearGradient id="gradText" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#00d4ff">
          <animate attributeName="stop-color" values="#00d4ff;#7c3aed;#ff6a00;#00d4ff" dur="9s" repeatCount="indefinite"/>
        </stop>
        <stop offset="100%" stop-color="#ff6a00">
          <animate attributeName="stop-color" values="#ff6a00;#ffd319;#00d4ff;#ff6a00" dur="9s" repeatCount="indefinite"/>
        </stop>
      </linearGradient>
    </defs>
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central"
          font-size="28" font-weight="700" fill="url(#gradText)">
      I've Exceeded Expectations Even My Own    </text>
  </svg>
</p>



<!-- ====== Color Wave Footer ====== -->
![footer](https://capsule-render.vercel.app/api?type=waving&height=140&section=footer&color=0:00d4ff,50:ffd319,100:ff6a00)
