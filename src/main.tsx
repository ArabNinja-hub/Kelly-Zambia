import '@fontsource-variable/inter';
import '@fontsource-variable/manrope';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from './lib/cart';
import './index.css';

const rawBase = import.meta.env.BASE_URL.replace(/\/+$/, '');
const routerBasename =
  rawBase && window.location.pathname.startsWith(rawBase) ? rawBase : '/';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={routerBasename}>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

