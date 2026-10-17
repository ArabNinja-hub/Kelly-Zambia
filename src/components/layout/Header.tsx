import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  Search,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { categories } from '../../data/categories';
import { navLinks, site } from '../../data/site';
import { useCart } from '../../lib/cart';
import { useOverlay } from '../../lib/hooks';
import { BagIcon } from '../BagIcon';
import { Logo } from '../Logo';

interface HeaderProps {
  onOpenSearch: () => void;
  searchTriggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export function Header({ onOpenSearch, searchTriggerRef }: HeaderProps) {
  const { itemCount, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [badgePop, setBadgePop] = useState(false);
  const location = useLocation();
  const mobilePanelRef = useRef<HTMLDivElement | null>(null);
  const mobileCloseRef = useRef<HTMLButtonElement | null>(null);
  const previousCount = useRef(itemCount);

  useOverlay(mobileOpen, () => setMobileOpen(false), mobilePanelRef, mobileCloseRef);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (itemCount > previousCount.current) {
      setBadgePop(true);
      const timer = window.setTimeout(() => setBadgePop(false), 400);
      previousCount.current = itemCount;
      return () => window.clearTimeout(timer);
    }
    previousCount.current = itemCount;
    return undefined;
  }, [itemCount]);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? 'border-line shadow-[0_8px_30px_-24px_rgba(10,27,46,0.5)]' : 'border-transparent'
      }`}
    >
      <div className="container-page">
        <div className="flex h-[68px] items-center justify-between gap-6 lg:h-[76px]">
          <Logo onClick={() => setMobileOpen(false)} />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) =>
              link.label === 'Categories' ? (
                <div key={link.to} className="group relative">
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center gap-1 rounded-md px-3.5 py-2 text-[13.5px] font-medium transition-colors hover:text-accent ${
                        isActive ? 'text-accent' : 'text-ink/70'
                      }`
                    }
                  >
                    Categories
                    <ChevronDown
                      className="h-3.5 w-3.5 opacity-50 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                      aria-hidden="true"
                    />
                  </NavLink>
                  <div className="invisible absolute left-0 top-full z-50 w-[460px] translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div className="grid grid-cols-2 gap-1 rounded-xl border border-line bg-white p-2 shadow-panel">
                      {categories.map((category) => (
                        <Link
                          key={category.slug}
                          to={`/shop?category=${category.slug}`}
                          className="flex items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-mist"
                        >
                          <span className="h-11 w-11 shrink-0 overflow-hidden rounded-md bg-mist">
                            <img
                              src={category.image}
                              alt=""
                              loading="lazy"
                              className="h-full w-full object-cover"
                            />
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-[12.5px] font-semibold text-ink">
                              {category.name}
                            </span>
                            <span className="mt-0.5 block text-[11px] text-ink-muted">
                              Browse range
                            </span>
                          </span>
                        </Link>
                      ))}
                      <Link
                        to="/categories"
                        className="col-span-2 mt-1 flex items-center justify-between rounded-lg border border-line px-3 py-2.5 text-[12px] font-semibold text-ink transition-colors hover:border-ink/20 hover:bg-mist"
                      >
                        View all categories
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative rounded-md px-3.5 py-2 text-[13.5px] font-medium transition-colors hover:text-accent ${
                      isActive ? 'text-accent' : 'text-ink/70'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="flex items-center gap-1.5">
            <div className="relative hidden md:block">
              <button
                ref={searchTriggerRef}
                type="button"
                onClick={onOpenSearch}
                className="flex w-[188px] items-center gap-2 rounded-md border border-line bg-mist/60 py-2 pl-3 pr-12 text-left text-[12.5px] text-ink-muted transition-colors hover:border-ink/20 hover:bg-white xl:w-[214px]"
              >
                <Search className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="flex-1 truncate">Search products</span>
              </button>
              <kbd
                aria-hidden="true"
                className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-ink/10 bg-white px-1.5 py-0.5 font-sans text-[10px] font-medium text-ink-muted xl:block"
              >
                ⌘K
              </kbd>
            </div>
            <Link
              to="/contact"
              className="mr-1 hidden rounded-md px-3 py-2 text-[12.5px] font-semibold text-ink/70 transition-colors hover:text-accent xl:block"
            >
              Enquire
            </Link>
            <button
              type="button"
              onClick={onOpenSearch}
              className="grid h-10 w-10 place-items-center rounded-md text-ink/70 transition-colors hover:bg-mist hover:text-ink md:hidden"
              aria-label="Search products"
            >
              <Search className="h-[18px] w-[18px]" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={openCart}
              className="relative grid h-10 w-10 place-items-center rounded-md text-ink transition-colors hover:bg-mist"
              aria-label={`Open shopping bag, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
            >
              <BagIcon className="h-[19px] w-[19px]" />
              {itemCount > 0 ? (
                <span
                  className={`absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-accent px-1 text-[10px] font-bold leading-none text-white ${
                    badgePop ? 'animate-count-pop' : ''
                  }`}
                  aria-hidden="true"
                >
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              ) : null}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-md text-ink transition-colors hover:bg-mist lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {mobileOpen
        ? createPortal(
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 h-full w-full cursor-default bg-navy-950/40 animate-fade-in"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              tabIndex={-1}
            />
            <div
              ref={mobilePanelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
              tabIndex={-1}
              className="absolute inset-y-0 right-0 flex w-[min(90vw,380px)] flex-col bg-white shadow-panel animate-slide-in"
            >
              <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-line px-5">
                <Logo onClick={() => setMobileOpen(false)} />
                <button
                  ref={mobileCloseRef}
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-md text-ink/70 transition-colors hover:bg-mist hover:text-ink"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="thin-scrollbar flex-1 overflow-y-auto px-5 py-6">
                <nav aria-label="Mobile" className="flex flex-col">
                  {navLinks.map((link, index) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) =>
                        `flex items-center justify-between border-b border-line/70 py-4 font-display text-[18px] font-semibold tracking-[-0.02em] transition-colors ${
                          isActive ? 'text-accent' : 'text-ink'
                        }`
                      }
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      {link.label}
                      <ArrowUpRight className="h-4 w-4 text-ink/25" aria-hidden="true" />
                    </NavLink>
                  ))}
                </nav>

                <p className="mb-3 mt-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                  {site.name} categories
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      to={`/shop?category=${category.slug}`}
                      className="rounded-lg border border-line p-2.5 transition-colors hover:border-ink/20 hover:bg-mist"
                    >
                      <span className="mb-2 block h-16 overflow-hidden rounded-md bg-mist">
                        <img
                          src={category.image}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </span>
                      <span className="text-[12px] font-semibold leading-tight text-ink">
                        {category.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="shrink-0 border-t border-line bg-mist/60 p-5">
                <Link to="/contact" className="btn-primary w-full">
                  Contact {site.name}
                </Link>
                <p className="mt-3 text-center text-[10.5px] text-ink-muted">
                  Demo website · Sample products and prices
                </p>
              </div>
            </div>
          </div>,
            document.body,
          )
        : null}
    </header>
  );
}
