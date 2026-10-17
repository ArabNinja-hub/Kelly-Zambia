import { useEffect, useRef, type RefObject } from 'react';

/** Sets the document title for the current page. */
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — Kelly Zambia` : 'Kelly Zambia — Technology & Electronics';
  }, [title]);
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Accessible overlay behaviour: locks background scroll, closes on Escape,
 * traps Tab focus inside the panel and restores focus when it closes.
 */
export function useOverlay(
  open: boolean,
  onClose: () => void,
  panelRef: RefObject<HTMLElement | null>,
  initialFocusRef?: RefObject<HTMLElement | null>,
) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    const originalPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const focusTimer = window.setTimeout(() => {
      const target =
        initialFocusRef?.current ??
        panelRef.current?.querySelector<HTMLElement>(FOCUSABLE) ??
        panelRef.current;
      target?.focus();
    }, 30);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeRef.current();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((element) => element.offsetParent !== null || element === document.activeElement);

      if (focusable.length === 0) {
        event.preventDefault();
        panelRef.current.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === panelRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPadding;
      previouslyFocused?.focus?.();
    };
  }, [open, panelRef, initialFocusRef]);
}

/** Calls the handler when the keyboard shortcut is pressed (e.g. Ctrl/⌘ + K). */
export function useKeyboardShortcut(key: string, handler: () => void) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === key.toLowerCase()) {
        event.preventDefault();
        handler();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [key, handler]);
}
