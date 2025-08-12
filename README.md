<!-- ==== NEON DARK HEADER ==== -->
<p align="center">
  <svg width="100%" viewBox="0 0 1200 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Abdelrahman Mohamed">
    <defs>
      <!-- خلفية جراديانت متحرك -->
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0a0b10">
          <animate attributeName="stop-color" values="#0a0b10;#0b1020;#0a0b10" dur="10s" repeatCount="indefinite"/>
        </stop>
        <stop offset="100%" stop-color="#0b1020">
          <animate attributeName="stop-color" values="#0b1020;#0a0b10;#0b1020" dur="10s" repeatCount="indefinite"/>
        </stop>
      </linearGradient>

      <!-- شريط ألوان هولوجرافيك -->
      <linearGradient id="holo" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"  stop-color="#00d4ff"/>
        <stop offset="25%" stop-color="#7c3aed"/>
        <stop offset="50%" stop-color="#ff6a00"/>
        <stop offset="75%" stop-color="#ffd319"/>
        <stop offset="100%" stop-color="#00ffa3"/>
        <animate attributeName="x1" values="0%;-100%" dur="8s" repeatCount="indefinite"/>
        <animate attributeName="x2" values="100%;0%"  dur="8s" repeatCount="indefinite"/>
      </linearGradient>

      <!-- جلو نيون ناعم -->
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="b"/>
        <feMerge>
          <feMergeNode in="b"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      <!-- ماسك ريفيل زي مسّاحة بتعدّي -->
      <linearGradient id="revealMask" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="black" stop-opacity="0"/>
        <stop offset="50%" stop-color="white" stop-opacity="1"/>
        <stop offset="100%" stop-color="black" stop-opacity="0"/>
        <animate attributeName="x1" values="-100%;100%" dur="6s" repeatCount="indefinite"/>
        <animate attributeName="x2" values="0%;200%" dur="6s" repeatCount="indefinite"/>
      </linearGradient>
      <mask id="reveal">
        <rect width="1200" height="280" fill="url(#revealMask)"/>
      </mask>

      <!-- ظل خارجي أقوى لفلاش خفيف -->
      <filter id="outerGlow">
        <feGaussianBlur stdDeviation="8" result="o"/>
        <feColorMatrix in="o" type="matrix"
          values="0 0 0 0 0
                  0 0 0 0 0.7
                  0 0 0 0 1
                  0 0 0 1 0" />
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <!-- الخلفية -->
    <rect width="1200" height="280" fill="url(#bg)"/>

    <!-- هالة نيون تحت النص -->
    <ellipse cx="600" cy="190" rx="360" ry="28" fill="url(#holo)" opacity="0.35" filter="url(#glow)">
      <animate attributeName="rx" values="320;380;320" dur="7s" repeatCount="indefinite"/>
    </ellipse>

    <!-- الاسم بخط سميك + ستروك هولوجرافيك -->
    <g filter="url(#outerGlow)">
      <text x="50%" y="130" text-anchor="middle" font-family="Inter, Poppins, Segoe UI, Arial" font-size="74" font-weight="800"
            fill="#eaf2ff" letter-spacing="1.5">
        Abdelrahman Mohamed
      </text>
      <text x="50%" y="130" text-anchor="middle" font-family="Inter, Poppins, Segoe UI, Arial" font-size="74" font-weight="900"
            fill="none" stroke="url(#holo)" stroke-width="2" filter="url(#glow)">
        Abdelrahman Mohamed
      </text>
      <!-- لمعة Reveal ماشية على الحروف -->
      <text x="50%" y="130" text-anchor="middle" font-family="Inter, Poppins, Segoe UI, Arial" font-size="74" font-weight="900"
            fill="url(#holo)" mask="url(#reveal)" opacity="0.9">
        Abdelrahman Mohamed
      </text>
    </g>

    <!-- ساب تايتل صغير ستايل تايبينج وهمي (فلاش ناعم) -->
    <text x="50%" y="185" text-anchor="middle" font-family="Fira Code, Consolas, monospace" font-size="20" fill="#9fb0ff" opacity="0.9">
      Frontend • React/Next • Tailwind • Pixel-Perfect UI
      <animate attributeName="opacity" values="0.5;1;0.5" dur="2.2s" repeatCount="indefinite"/>
    </text>

    <!-- خط سفلي متحرّك -->
    <rect x="150" y="210" width="900" height="2.2" rx="1" fill="#0e1525"/>
    <rect x="150" y="210" width="220" height="2.2" rx="1" fill="url(#holo)">
      <animate attributeName="x" values="150;830;150" dur="6s" repeatCount="indefinite"/>
    </rect>
  </svg>
</p>
