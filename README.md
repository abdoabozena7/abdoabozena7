<!-- ================= NEON DARK README (ONE SNIPPET) ================= -->

<!-- ====== Header (Neon Dark with Glow + Reveal) ====== -->
<p align="center">
  <svg width="100%" viewBox="0 0 1200 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Abdelrahman Mohamed">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0a0b10">
          <animate attributeName="stop-color" values="#0a0b10;#0b1020;#0a0b10" dur="10s" repeatCount="indefinite"/>
        </stop>
        <stop offset="100%" stop-color="#0b1020">
          <animate attributeName="stop-color" values="#0b1020;#0a0b10;#0b1020" dur="10s" repeatCount="indefinite"/>
        </stop>
      </linearGradient>

      <linearGradient id="holo" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"  stop-color="#00d4ff"/>
        <stop offset="25%" stop-color="#7c3aed"/>
        <stop offset="50%" stop-color="#ff6a00"/>
        <stop offset="75%" stop-color="#ffd319"/>
        <stop offset="100%" stop-color="#00ffa3"/>
        <animate attributeName="x1" values="0%;-100%" dur="8s" repeatCount="indefinite"/>
        <animate attributeName="x2" values="100%;0%"  dur="8s" repeatCount="indefinite"/>
      </linearGradient>

      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>

      <linearGradient id="revealMask" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stop-color="black" stop-opacity="0"/>
        <stop offset="50%"  stop-color="white" stop-opacity="1"/>
        <stop offset="100%" stop-color="black" stop-opacity="0"/>
        <animate attributeName="x1" values="-100%;100%" dur="6s" repeatCount="indefinite"/>
        <animate attributeName="x2" values="0%;200%"  dur="6s" repeatCount="indefinite"/>
      </linearGradient>
      <mask id="reveal"><rect width="1200" height="280" fill="url(#revealMask)"/></mask>

      <filter id="outerGlow">
        <feGaussianBlur stdDeviation="8" result="o"/>
        <feColorMatrix in="o" type="matrix"
          values="0 0 0 0 0
                  0 0 0 0 0.7
                  0 0 0 0 1
                  0 0 0 1 0"/>
        <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>

    <rect width="1200" height="280" fill="url(#bg)"/>

    <ellipse cx="600" cy="190" rx="360" ry="28" fill="url(#holo)" opacity="0.35" filter="url(#glow)">
      <animate attributeName="rx" values="320;380;320" dur="7s" repeatCount="indefinite"/>
    </ellipse>

    <g filter="url(#outerGlow)">
      <text x="50%" y="130" text-anchor="middle" font-family="Inter, Poppins, Segoe UI, Arial" font-size="74" font-weight="800"
            fill="#eaf2ff" letter-spacing="1.5">Abdelrahman Mohamed</text>
      <text x="50%" y="130" text-anchor="middle" font-family="Inter, Poppins, Segoe UI, Arial" font-size="74" font-weight="900"
            fill="none" stroke="url(#holo)" stroke-width="2" filter="url(#glow)">Abdelrahman Mohamed</text>
      <text x="50%" y="130" text-anchor="middle" font-family="Inter, Poppins, Segoe UI, Arial" font-size="74" font-weight="900"
            fill="url(#holo)" mask="url(#reveal)" opacity="0.9">Abdelrahman Mohamed</text>
    </g>

    <text x="50%" y="185" text-anchor="middle" font-family="Fira Code, Consolas, monospace" font-size="20" fill="#9fb0ff" opacity="0.9">
      Frontend • React/Next • Tailwind • Pixel-Perfect UI
      <animate attributeName="opacity" values="0.5;1;0.5" dur="2.2s" repeatCount="indefinite"/>
    </text>

    <rect x="150" y="210" width="900" height="2.2" rx="1" fill="#0e1525"/>
    <rect x="150" y="210" width="220" height="2.2" rx="1" fill="url(#holo)">
      <animate attributeName="x" values="150;830;150" dur="6s" repeatCount="indefinite"/>
    </rect>
  </svg>
</p>

<!-- ====== Typing (Dark) ====== -->
<p align="center">
  <img src="https://readme-typing-svg.demolab.com?size=26&duration=2600&pause=700&center=true&vCenter=true&width=800&color=9FB0FF&font=Fira+Code&lines=Code+Like+a+Rockstar;Debugging+Like+a+Therapist;Rebel+Spirit%2C+Clean+Code" alt="Typing" />
</p>

<!-- ====== Quick Links / Social ====== -->
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

<!-- ====== Skills (Dark Theme) ====== -->
<p align="center">
  <img src="https://skillicons.dev/icons?i=html,css,js,ts,react,nextjs,tailwind,figma,git,github&theme=dark" />
</p>

<!-- ====== Holo Divider ====== -->
<p align="center">
  <svg width="900" height="26" viewBox="0 0 900 26" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bar" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"  stop-color="#00d4ff"/>
        <stop offset="50%" stop-color="#ffd319"/>
        <stop offset="100%" stop-color="#ff6a00"/>
      </linearGradient>
    </defs>
    <rect x="0" y="12" width="900" height="2" rx="1" fill="#101525"/>
    <rect x="0" y="12" width="160" height="2" rx="1" fill="url(#bar)">
      <animate attributeName="x" values="0;740;0" dur="7s" repeatCount="indefinite"/>
    </rect>
    <circle r="3" cx="0" cy="13" fill="#eaf2ff">
      <animate attributeName="cx" values="0;900;0" dur="7s" repeatCount="indefinite"/>
    </circle>
  </svg>
</p>

<!-- ====== Footer (Dark Aura) ====== -->
<p align="center">
  <svg width="100%" viewBox="0 0 1200 160" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="aura" cx="50%" cy="10%" r="80%">
        <stop offset="0%"  stop-color="#00d4ff" stop-opacity="0.35"/>
        <stop offset="40%" stop-color="#7c3aed" stop-opacity="0.18"/>
        <stop offset="80%" stop-color="#000814" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="160" fill="#060910"/>
    <ellipse cx="600" cy="0" rx="520" ry="120" fill="url(#aura)">
      <animate attributeName="rx" values="480;560;480" dur="9s" repeatCount="indefinite"/>
    </ellipse>
    <text x="50%" y="120" text-anchor="middle" font-family="Fira Code, monospace" font-size="14" fill="#7a8fb5" opacity="0.85">
      © Abdelrahman Mohamed — Crafted with React • Next • Tailwind
    </text>
  </svg>
</p>

<!-- ================= END ================= -->
