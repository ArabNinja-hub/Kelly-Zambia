import '@fontsource-variable/inter';
import '@fontsource-variable/manrope';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from './lib/cart';
import './index.css';

const rawBase = import.meta.env.BASE_URL.replace(/\/+$/, '');
const pathname = window.location.pathname;
const hasBasePrefix =
  Boolean(rawBase) &&
  (pathname.toLowerCase() === rawBase.toLowerCase() ||
    pathname.toLowerCase().startsWith(`${rawBase.toLowerCase()}/`));
const routerBasename = hasBasePrefix ? pathname.slice(0, rawBase.length) : '/';

// Restore deep-link path if redirected via a ?/path query string on GitHub Pages.
if (window.location.search.startsWith('?/')) {
  const decoded = window.location.search
    .slice(2)
    .split('&')
    .map((segment) => segment.replace(/~and~/g, '&'));
  const restoredPath = `/${decoded[0].replace(/^\/+/, '')}`;
  const restoredQuery = decoded.slice(1).join('&');
  const nextUrl = `${routerBasename === '/' ? '' : routerBasename}${restoredPath}${
    restoredQuery ? `?${restoredQuery}` : ''
  }${window.location.hash}`;
  window.history.replaceState(null, '', nextUrl);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={routerBasename}>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
