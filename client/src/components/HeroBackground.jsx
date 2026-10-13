// Glossy monochrome "tubes" behind the home hero, drawn in SVG.
// Each tube = dark body + wide soft glow + narrow bright highlight.
const TUBES = [
  'M-180 640 C 120 380, 360 880, 640 640 S 1020 220, 1380 420',
  'M 180 -160 C 40 220, 460 360, 620 180 S 960 -80, 1080 160 S 1160 620, 880 760',
  'M 1420 980 C 1100 700, 860 1000, 560 860 S 140 900, -120 1040',
  'M -160 120 C 120 60, 200 300, 60 420',
];

export default function HeroBackground() {
  return (
    <div className="hero-bg" aria-hidden="true">
      <svg viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="tube-light" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
            <stop offset="0.45" stopColor="#fff" stopOpacity="0.12" />
            <stop offset="1" stopColor="#fff" stopOpacity="0.7" />
          </linearGradient>
          <filter id="tube-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="34" />
          </filter>
          <filter id="tube-shine" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>
        {TUBES.map((d) => (
          <g key={d} fill="none" strokeLinecap="round">
            <path d={d} stroke="#0b0b0b" strokeWidth="150" />
            <path d={d} stroke="url(#tube-light)" strokeWidth="140" opacity="0.5" filter="url(#tube-glow)" />
            <path d={d} stroke="url(#tube-light)" strokeWidth="26" opacity="1" filter="url(#tube-shine)" />
          </g>
        ))}
      </svg>
    </div>
  );
}
