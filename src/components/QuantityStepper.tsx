import { Minus, Plus } from 'lucide-react';

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
}

export function QuantityStepper({
  value,
  onChange,
  label,
  min = 1,
  max = 99,
  size = 'md',
}: QuantityStepperProps) {
  const buttonSize = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10';
  const valueWidth = size === 'sm' ? 'w-8 text-[12.5px]' : 'w-10 text-sm';

  return (
    <div className="inline-flex items-center rounded-md border border-ink/15 bg-white">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={`Decrease quantity of ${label}`}
        className={`grid ${buttonSize} place-items-center rounded-l-md text-ink/70 transition-colors hover:bg-mist hover:text-ink disabled:cursor-not-allowed disabled:opacity-30`}
      >
        <Minus className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      <span
        className={`${valueWidth} text-center font-semibold tabular-nums text-ink`}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={`Increase quantity of ${label}`}
        className={`grid ${buttonSize} place-items-center rounded-r-md text-ink/70 transition-colors hover:bg-mist hover:text-ink disabled:cursor-not-allowed disabled:opacity-30`}
      >
        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}
