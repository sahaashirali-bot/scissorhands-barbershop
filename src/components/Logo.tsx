export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M32 3 4 12v18c0 16 12 26 28 31 16-5 28-15 28-31V12L32 3Z"
        fill="#0a0a0b"
        stroke="#c9a227"
        strokeWidth="2"
      />
      <path
        d="M32 3 4 12v18c0 16 12 26 28 31 16-5 28-15 28-31V12L32 3Z"
        fill="none"
        stroke="#c8102e"
        strokeWidth="1"
        opacity="0.6"
        transform="scale(0.94) translate(2, 2.2)"
      />
      <g transform="translate(32,17)">
        <path
          d="M-11 4 -13 -6 -7 -1 -2 -9 2 -9 7 -1 13 -6 11 4Z"
          fill="#c9a227"
        />
        <circle cx="-13" cy="-6" r="2" fill="#c9a227" />
        <circle cx="13" cy="-6" r="2" fill="#c9a227" />
        <circle cx="0" cy="-9" r="2" fill="#c9a227" />
      </g>
      <g transform="translate(32,42) rotate(45)">
        <rect x="-3" y="-16" width="6" height="32" fill="#f4efe4" />
        {[...Array(6)].map((_, i) => (
          <rect
            key={i}
            x="-3"
            y={-16 + i * 5.4}
            width="6"
            height="2.7"
            fill={i % 2 === 0 ? "#c8102e" : "#1f4fa8"}
          />
        ))}
      </g>
    </svg>
  );
}

export function LogoWordmark({ className }: { className?: string }) {
  return (
    <div className={className}>
      <span className="font-display text-2xl tracking-wide text-bone leading-none block">
        SCISSORHANDS
      </span>
      <span className="text-[0.6rem] tracking-[0.35em] text-gold uppercase block">
        Barbershop
      </span>
    </div>
  );
}
