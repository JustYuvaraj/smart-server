# SmartServe

A mobile-first home-services PWA built with React, TypeScript, Vinext, Cloudflare D1 and R2. Designed for phone screens from 320 px upward, with bottom navigation, accessible dialogs, large primary touch targets, camera QR scanning, location checks, and home-screen installation.

## Included in version 1

- Customer and professional accounts, using the hosting platform's ChatGPT sign-in.
- Profiles, service requests, photos, quotes, and customer selection.
- Server-locked labour and work scope with a SHA-256 digest.
- Job-bound HMAC arrival codes that expire after 60 seconds. The customer scans the QR or pastes the code. Both reported device locations must be within 100 metres of the saved address, with reported accuracy no worse than 100 metres.
- Photo-backed extra-work and material-cost requests, explicitly approved or rejected by the customer.
- Final invoices, customer-confirmed completion, reviews, and a property-grouped Home Passport.
- Private photo storage, account and job authorization, optimistic-concurrency checks, and same-origin mutation checks.
- An isolated per-user demo workspace with customer/worker switching and labelled sample locations. Demo and live records are stored separately in D1.
- In-app updates while open, cancellation before work starts, and problem notes visible to both parties.
- Install manifest, PNG icons, service worker, and offline fallback. Private API responses are never cached.

## Run locally

Use Node.js 22.13 or newer.

```sh
npm ci
npm run db:generate
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_friendly_bloodaxe.sql
npm run dev
```

Apply each migration only once. The development server prints its local URL. Local sign-in uses the starter's loopback-only test identity. Production authentication is provided by Sites; local mock auth is excluded from production.

```sh
npm run typecheck
npm test
npm run test:api
```

The API smoke test requires the local development server on port 5173. It creates labelled test records only in the local demo database. It checks a complete 500 + 200 + 150 = 850 rupee job, protected photo uploads, permissions, replay rejection, persistence and CSRF handling.

## Showcase

Sign in, then choose **Try the demo** (or find it under Account). Accept Arun's sample quote. Switch to Worker, open the booking and generate an arrival QR using the sample location. Switch back to Customer, select Verify arrival, use the sample location and demo worker code before it expires. Continue with material receipts and extra-work approvals, mark work finished as Worker, and confirm as Customer. The completed record appears in Home Passport.

## Deployment

The tracked `.openai/hosting.json` identifies this Site and declares the D1 `DB` and R2 `BUCKET` bindings. Sites provisions storage and applies committed Drizzle migrations when publishing. The build outputs a Cloudflare Worker and static client assets. This is not a GitHub Pages/static-only application.

The initial deployment is owner-private. Enabling use by other accounts requires changing the Site's audience. Other hosting providers need equivalent D1/R2 bindings and a trusted authentication adapter; raw identity headers must never be accepted directly from the public internet.

## Boundaries of this version

Payments are settled directly with the professional. No payment collection, OCR extraction, automated warranties, live tracking, weighted trust score, identity background checks, password recovery, or staffed support desk is included. Receipts are entered manually and customer-reviewed. Browser location can be inaccurate or spoofed; QR plus location checks are not a guarantee of physical identity. Customers should compare the worker with the profile. Uploaded images must be JPG, PNG or WebP and no larger than 5 MB.

Active service actions require a connection. Offline mode displays a clear reconnect screen. PWA installation depends on browser support. The responsive web app remains usable without installation. A physical iPhone/Android camera and GPS field test is recommended before relying on doorstep checks for real bookings.

The agreed scope and prices are protected by application permissions and version checks, not by an external immutable ledger. Uploaded data and customer records stay out of Git. All amounts are stored as integer paise.
