import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className = '',
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${
        align === 'center' ? 'text-center md:flex-col md:items-center' : ''
      } ${className}`}
    >
      <div className={align === 'center' ? 'flex flex-col items-center' : ''}>
        <p className={`eyebrow ${align === 'center' ? 'justify-center' : ''}`}>{eyebrow}</p>
        <h2 className="mt-4 max-w-2xl font-display text-[30px] font-semibold leading-[1.08] tracking-[-0.035em] text-ink sm:text-[38px]">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-ink-muted sm:text-[15px]">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
