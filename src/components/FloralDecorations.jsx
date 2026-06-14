/**
 * Latin Cross icon.
 */
export function ChristianCross({ className = "" }) {
  return (
    <svg 
      className={`svg-icon ${className}`} 
      viewBox="0 0 24 24" 
      style={{ color: 'var(--text-gold)' }}
    >
      <path d="M11 2h2v6h5v2h-5v12h-2v-12h-5v-2h5V2z" fill="currentColor" />
    </svg>
  );
}

/**
 * Stylized flying dove icon.
 */
export function HolyDove({ className = "" }) {
  return (
    <svg 
      className={`svg-icon ${className}`} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5"
    >
      {/* Dynamic flying dove path */}
      <path 
        d="M12 21c-1.5-3.5-5-5-8-5 3.5-.5 6-2 8-5.5 2 3.5 4.5 5 8 5.5-3 0-6.5 1.5-8 5z" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M12 10.5C12 7.5 9.5 5.5 6 6c3 0 5 1.5 6 4.5 1-3 3-4.5 6-4.5-3.5-.5-6 1.5-6 4.5z" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}

/**
 * Symmetrical floral border showing white lilies and golden leaves.
 */
export function FloralBorder({ isTop = true }) {
  return (
    <svg 
      className={`floral-border ${isTop ? 'floral-top' : 'floral-bottom'}`} 
      viewBox="0 0 400 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Symmetrical branch vines */}
      <path 
        d="M200 45 C150 45, 100 25, 50 35 C25 40, 12 30, 0 35" 
        stroke="var(--text-gold)" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
      />
      <path 
        d="M200 45 C250 45, 300 25, 350 35 C375 40, 388 30, 400 35" 
        stroke="var(--text-gold)" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
      />

      {/* Symmetrical leaves */}
      <path d="M120 35 Q135 20 150 38" stroke="var(--text-gold)" strokeWidth="1" fill="rgba(226, 199, 153, 0.1)" />
      <path d="M80 32 Q95 18 110 35" stroke="var(--text-gold)" strokeWidth="1" fill="rgba(226, 199, 153, 0.1)" />
      <path d="M280 35 Q265 20 250 38" stroke="var(--text-gold)" strokeWidth="1" fill="rgba(226, 199, 153, 0.1)" />
      <path d="M320 32 Q305 18 290 35" stroke="var(--text-gold)" strokeWidth="1" fill="rgba(226, 199, 153, 0.1)" />

      {/* Center Lily Flower (Hoa Loa Kèn) */}
      {/* Center petal */}
      <path 
        d="M200 15 C188 35, 192 65, 200 80 C208 65, 212 35, 200 15 Z" 
        fill="var(--text-white)" 
        stroke="var(--text-gold)" 
        strokeWidth="1.2" 
      />
      {/* Left petal */}
      <path 
        d="M200 50 C175 48, 168 32, 172 18 C184 30, 190 42, 200 50 Z" 
        fill="var(--text-white)" 
        stroke="var(--text-gold)" 
        strokeWidth="1.2" 
      />
      {/* Right petal */}
      <path 
        d="M200 50 C225 48, 232 32, 228 18 C216 30, 210 42, 200 50 Z" 
        fill="var(--text-white)" 
        stroke="var(--text-gold)" 
        strokeWidth="1.2" 
      />
      {/* Stamen/pistil details */}
      <path d="M200 45 L200 25" stroke="var(--text-gold)" strokeWidth="1" />
      <circle cx="200" cy="23" r="1.5" fill="var(--text-gold)" />

      {/* Side small flower buds */}
      <g transform="translate(100, 35)">
        <circle cx="0" cy="0" r="4" fill="var(--text-white)" stroke="var(--text-gold)" strokeWidth="1" />
        <circle cx="-6" cy="0" r="2" fill="var(--text-white)" stroke="var(--text-gold)" strokeWidth="0.8" />
        <circle cx="6" cy="0" r="2" fill="var(--text-white)" stroke="var(--text-gold)" strokeWidth="0.8" />
        <circle cx="0" cy="-6" r="2" fill="var(--text-white)" stroke="var(--text-gold)" strokeWidth="0.8" />
        <circle cx="0" cy="6" r="2" fill="var(--text-white)" stroke="var(--text-gold)" strokeWidth="0.8" />
      </g>
      
      <g transform="translate(300, 35)">
        <circle cx="0" cy="0" r="4" fill="var(--text-white)" stroke="var(--text-gold)" strokeWidth="1" />
        <circle cx="-6" cy="0" r="2" fill="var(--text-white)" stroke="var(--text-gold)" strokeWidth="0.8" />
        <circle cx="6" cy="0" r="2" fill="var(--text-white)" stroke="var(--text-gold)" strokeWidth="0.8" />
        <circle cx="0" cy="-6" r="2" fill="var(--text-white)" stroke="var(--text-gold)" strokeWidth="0.8" />
        <circle cx="0" cy="6" r="2" fill="var(--text-white)" stroke="var(--text-gold)" strokeWidth="0.8" />
      </g>
    </svg>
  );
}
