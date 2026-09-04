import { useId } from "react";

interface CrestProps {
  size?: number;
  detailed?: boolean;
  className?: string;
}

/** Резервный SVG-герб клуба: щит со шпилем, звездой и волнами Невы. */
export default function Crest({ size = 200, detailed = true, className }: CrestProps) {
  const uid = useId().replace(/:/g, "");
  const topPath = `arc-top-${uid}`;
  const bottomPath = `arc-bottom-${uid}`;

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className={className} role="img" aria-label="Герб ЖФК Северная Пальмира">
      <defs>
        <radialGradient id={`glow-${uid}`} cx="50%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#2a0a16" />
          <stop offset="60%" stopColor="#0d0d0d" />
          <stop offset="100%" stopColor="#050505" />
        </radialGradient>
      </defs>

      <circle cx="100" cy="100" r="97" fill={`url(#glow-${uid})`} stroke="#ff2a6d" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
      <circle cx="100" cy="100" r="72" fill="none" stroke="rgba(255,42,109,0.5)" strokeWidth="1.4" />

      {detailed && (
        <>
          <defs>
            <path id={topPath} d="M 100,100 m -82,0 a 82,82 0 1,1 164,0" fill="none" />
            <path id={bottomPath} d="M 100,100 m -82,0 a 82,82 0 1,0 164,0" fill="none" />
          </defs>
          <text fill="#ffffff" fontSize="13.5" fontFamily="Oswald, sans-serif" letterSpacing="3.4" fontWeight="600">
            <textPath href={`#${topPath}`} startOffset="50%" textAnchor="middle">СЕВЕРНАЯ ПАЛЬМИРА</textPath>
          </text>
          <text fill="rgba(255,255,255,0.65)" fontSize="10" fontFamily="Oswald, sans-serif" letterSpacing="3" fontWeight="500">
            <textPath href={`#${bottomPath}`} startOffset="50%" textAnchor="middle">САНКТ-ПЕТЕРБУРГ · 2011</textPath>
          </text>
          <circle cx="18" cy="100" r="2.4" fill="#ff2a6d" />
          <circle cx="182" cy="100" r="2.4" fill="#ff2a6d" />
        </>
      )}

      <path d="M100 42 L136 55 V96 C136 126 121 141 100 149 C79 141 64 126 64 96 V55 Z" fill="#0a0a0a" stroke="#ff2a6d" strokeWidth="2" />
      <path d="M100 48 L131 59 V95 C131 121 118 134 100 142 C82 134 69 121 69 95 V59 Z" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
      <path d="m100 54 2.1 4.4 4.9.6-3.6 3.4.9 4.8-4.3-2.4-4.3 2.4.9-4.8-3.6-3.4 4.9-.6L100 54Z" fill="#ff2a6d" />
      <path d="M100 70 V116" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M93 84 h14 M90 92 h20" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M100 70 l3.4 6 h-6.8 Z" fill="#ffffff" />
      <path d="M74 120 q6.5 -5 13 0 t13 0 t13 0" fill="none" stroke="#ff2a6d" strokeWidth="2" strokeLinecap="round" />
      <path d="M78 129 q6 -4.5 11.5 0 t11.5 0 t11.5 0" fill="none" stroke="rgba(255,42,109,0.55)" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="100" cy="159" r="8.5" fill="#0d0d0d" stroke="#ffffff" strokeWidth="1.4" />
      <path d="m100 154.5 3.2 2.4-1.2 3.7h-4l-1.2-3.7Z" fill="#ffffff" />
      <path d="M100 150.6v3.9m3.2 2.4 3.7-1.2m-2.5 5.4 2.6 2.8m-7.6-2.8-2.6 2.8m1.4-8.2-3.7-1.2" stroke="#ffffff" strokeWidth="1" />
      <path d="M52 160 l6 -5 M148 160 l-6 -5 M46 148 l7 -4 M154 148 l-7 -4" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
