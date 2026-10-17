interface BagIconProps {
  className?: string;
  strokeWidth?: number;
}

/**
 * A shopping bag with a visible handle — reads more clearly than the
 * simplified Lucide bag at small header sizes.
 */
export function BagIcon({ className = 'h-[18px] w-[18px]', strokeWidth = 1.7 }: BagIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5.4 8h13.2l-1 11.2a1.6 1.6 0 0 1-1.6 1.45H8a1.6 1.6 0 0 1-1.6-1.45L5.4 8Z" />
      <path d="M8.75 8V6.6a3.25 3.25 0 0 1 6.5 0V8" />
    </svg>
  );
}
