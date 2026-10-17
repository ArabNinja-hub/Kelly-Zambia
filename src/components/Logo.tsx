import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'dark' | 'light';
  onClick?: () => void;
  className?: string;
}

export function Logo({ variant = 'dark', onClick, className = '' }: LogoProps) {
  const isLight = variant === 'light';

  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Kelly Zambia home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span
        className={`relative grid h-9 w-9 place-items-center rounded-[10px] transition-transform duration-300 group-hover:-translate-y-px ${
          isLight ? 'bg-white' : 'bg-ink'
        }`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
          <path
            d="M7 4v16M7 12.2 15.6 4M7 12.2 16.4 20"
            stroke={isLight ? '#0A1B2E' : '#FFFFFF'}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className={`absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-[3px] bg-accent ring-2 ${
            isLight ? 'ring-navy-950' : 'ring-white'
          }`}
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[16px] font-extrabold tracking-[-0.02em] ${
            isLight ? 'text-white' : 'text-ink'
          }`}
        >
          KELLY
        </span>{' '}
        <span
          className={`mt-[3px] text-[7.5px] font-semibold tracking-[0.36em] ${
            isLight ? 'text-white/55' : 'text-ink-muted'
          }`}
        >
          ZAMBIA
        </span>
      </span>
    </Link>
  );
}
