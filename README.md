# Kelly Zambia — website demo

A premium, presentation-ready storefront demo for **Kelly Zambia**, a technology and
electronics retailer in Zambia. Built to show how the business could showcase products,
build trust and collect enquiries online.

> **This is a demonstration, not a live store.** Products, names, specifications and
> prices are illustrative samples. No payment is processed, no order is placed and no
> enquiry is transmitted anywhere. Contact details are visible placeholders pending
> verified business information.

## Stack

- **React 19 + TypeScript**, bundled with **Vite**
- **Tailwind CSS** for styling, **Lucide** icons
- **React Router** for pages (home, shop, categories, product detail, about, contact,
  demo checkout, 404)
- Local **Inter** and **Manrope** variable fonts (self-hosted, no tracking requests)
- No backend, database or authentication — the demo cart persists to `localStorage`

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # preview the production build
```

## What works

- Responsive desktop / tablet / mobile layouts with no horizontal overflow
- Product search (header overlay, `⌘K` / `Ctrl K`) and catalogue search + sorting
- Category filtering via deep links (`/shop?category=audio`)
- Product detail pages with quantity selection and add-to-bag
- Cart drawer: add, update quantities, remove, correct ZMW subtotal, persisted locally
- Demo checkout / enquiry flow with validation and a clear "not a real order" confirmation
- Contact form validation, inline errors, accessible error summary and demo success state
- Keyboard accessible dialogs (Esc to close, focus trap, focus restore), skip link,
  visible focus rings, labelled inputs and `aria-live` status messages

## Replacing demo content with real business information

All editable content is centralised and clearly marked:

| What | Where |
| --- | --- |
| Products, prices, specs, imagery | `src/data/products.ts` (see the header comment for instructions) |
| Categories | `src/data/categories.ts` |
| Contact placeholders, nav links, service copy | `src/data/site.ts` |
| Product / category / editorial photography | `public/images/` (WebP) |
| Demo labels shown in the UI | Search for `DemoNote` usage and `demoNotes` in `src/data/site.ts` |

There is deliberately **no invented information** about Kelly Zambia: no founding date,
history, addresses, phone numbers, email addresses, social profiles, stock levels,
warranties, delivery promises, ratings or reviews. Social links are omitted until official
URLs are supplied.

## Project structure

```
src/
  components/          Reusable UI (product cards, cart drawer, search, forms, layout)
  data/                Centralised, editable demo content
  lib/                 Cart state, formatting/validation helpers, hooks
  pages/               Route-level views
public/images/         Optimised WebP photography used by the demo
```

## Notes for the client presentation

- Every demo product carries a visible "Demo product / illustrative price" label.
- The checkout is intentionally an **enquiry-style demo checkout** — no payment fields.
- Replacing the data files and confirming contact details is all that is needed to turn
  this presentation into a realistic picture of Kelly Zambia online.
