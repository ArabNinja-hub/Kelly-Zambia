import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useKeyboardShortcut } from '../../lib/hooks';
import { CartDrawer } from '../CartDrawer';
import { SearchOverlay } from '../SearchOverlay';
import { AnnouncementBar } from './AnnouncementBar';
import { Footer } from './Footer';
import { Header } from './Header';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}

export function Layout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const searchTriggerRef = useRef<HTMLButtonElement | null>(null);

  useKeyboardShortcut('k', () => setSearchOpen(true));

  // When the overlay is opened via the keyboard shortcut, focus would otherwise
  // return to <body>. Send it back to the visible search trigger instead.
  useEffect(() => {
    if (searchOpen) return;
    const timer = window.setTimeout(() => {
      if (document.activeElement === document.body && searchTriggerRef.current) {
        searchTriggerRef.current.focus();
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [searchOpen]);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2.5 focus:text-[13px] focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <AnnouncementBar />
      <Header searchTriggerRef={searchTriggerRef} onOpenSearch={() => setSearchOpen(true)} />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
