import { Info } from 'lucide-react';
import type { ReactNode } from 'react';

interface DemoNoteProps {
  children: ReactNode;
  tone?: 'light' | 'dark' | 'plain';
  className?: string;
  label?: string;
}

/**
 * Consistent, visible labelling for illustrative demo content.
 * Remove instances only when the corresponding data has been verified.
 */
export function DemoNote({ children, tone = 'light', className = '', label }: DemoNoteProps) {
  const styles =
    tone === 'dark'
      ? 'border-white/15 bg-white/[0.06] text-white/65'
      : tone === 'plain'
        ? 'border-line bg-transparent text-ink-muted'
        : 'border-ink/10 bg-mist/80 text-ink-muted';

  return (
    <div
      className={`flex items-start gap-2.5 rounded-lg border px-3.5 py-2.5 ${styles} ${className}`}
    >
      <Info className="mt-[1px] h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden="true" />
      <p className="text-[11.5px] leading-relaxed">
        {label ? (
          <span className="mr-1.5 font-semibold uppercase tracking-[0.1em]">
            {label}
          </span>
        ) : null}
        {children}
      </p>
    </div>
  );
}
