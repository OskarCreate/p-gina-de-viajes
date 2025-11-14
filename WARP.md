# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This project is a Vite + React + TypeScript single-page application that implements the "Catálogo de Viajes Nacionales" travel catalogue UI. The frontend is entirely client-side and uses Tailwind-style utility classes plus custom CSS tokens for theming. User accounts and reservations are stored in `localStorage` only; there is no persisted backend in this repo.

Key entry points:
- `../index.html` – Vite HTML shell with `#root` container.
- `src/main.tsx` – React entry; mounts `<App />` into `#root` and imports global styles from `index.css`.
- `src/App.tsx` – Top-level app component that wires navigation, authentication, and reservation flows.

## Development Commands

All Node-based commands should be run from the project root (one level above `src`).

- Install dependencies (once per environment):
  ```bash
  cd ..
  npm install
  ```

- Start development server (Vite dev server on port 3000, auto-open in browser):
  ```bash
  cd ..
  npm run dev
  ```

- Build production bundle (outputs to `build/`):
  ```bash
  cd ..
  npm run build
  ```

At the moment there are **no** `test` or `lint` scripts defined in `package.json`. If you add testing or linting tooling (e.g. Vitest, Jest, ESLint), also add the corresponding `npm run` scripts and update this section.

The Vite dev server is configured with a proxy:
- Requests to `/api/**` from the browser are forwarded to `http://localhost:8000`. Use this path for any future backend integration.

## High-Level Frontend Architecture

### App-level State and Navigation

`App.tsx` is the main orchestrator and holds the core UI state:
- `user` – currently authenticated user (`{ email, name } | null`), persisted to `localStorage` under `peruTravelsCurrentUser`.
- `selectedTrip` – the trip or package the user is reserving; shape varies slightly between destination and package flows.
- `currentView` – simple view state (`'home' | 'reservation' | 'myReservations'`) used for conditional rendering instead of a router.
- `showAuthModal` – toggles the authentication modal.

Navigation is controlled by setting `currentView`:
- `'home'` – main catalogue view: navbar, search form, featured destinations, and packages grid.
- `'reservation'` – full reservation flow via `ReservationView`, shown only when a `selectedTrip` exists.
- `'myReservations'` – list of previous reservations via `MyReservations`, available only to logged-in users.

The `Navbar` receives callbacks from `App` to open the auth modal, log the user out, and navigate to "My Reservations". Selecting a destination or package in `App` calls `handleTripSelect`, which:
- Forces authentication (opens `AuthModal`) if `user` is `null`.
- Otherwise sets `selectedTrip` and switches to the reservation view.

### Local Data Model

`App.tsx` contains hard-coded arrays for UI content:
- `featuredDestinations` – list of flight-only offers, each with `id`, `city`, `image`, `priceUSD`, `pricePEN`, and a `badge`.
- `packages` – list of multi-day packages, each with `id`, `title`, `image`, `days`, `nights`, `priceUSD`, `pricePEN`, and an `includes` string.

These objects are passed into presentation components:
- `DestinationCard` – represents a destination offer; clicking it triggers `onSelect` with a normalized `trip` object (type `'destination'`).
- `PackageCard` – represents a package; clicking "¡Lo quiero!" triggers `onSelect` with a normalized `trip` object (type `'package'`).

Because the trip object is consumed in multiple places (`ReservationView`, `MyReservations`), keep any future changes to this shape consistent across those components.

### Authentication Flow (LocalStorage-backed)

Authentication is handled entirely on the client via `AuthModal` and `App`:
- `AuthModal` maintains its own internal form state and login/register mode (`isLoginMode`).
- Registered users are stored in `localStorage` under the key `peruTravelsUsers` as an array of:
  ```ts
  type StoredUser = { email: string; password: string; name: string };
  ```
- On login, `AuthModal` looks up `peruTravelsUsers` by exact email/password match. On success it calls `onLogin` with `{ email, name }`.
- `App` persists the current user to `localStorage` under `peruTravelsCurrentUser` and restores it on initial mount using `useEffect`.

When implementing auth-related features, reuse these keys and shapes to avoid breaking existing flows. All authentication is purely for UX; there is no server-side validation.

### Reservations Flow and Storage

Reservations are coordinated across three components:

- `ReservationView` – full page form shown when `currentView === 'reservation'`.
  - Receives `trip`, `userEmail`, and `onBack` from `App`.
  - Collects structured data: passenger info, contact info, travel dates, payment method, special requests.
  - On submit, validates that terms are accepted and then writes a reservation entry to `localStorage` under `peruTravelsReservations`.
  - Each reservation object includes:
    ```ts
    type Reservation = {
      userEmail: string;
      trip: Trip; // matches the shape created in App.tsx
      passengerInfo: { firstName; lastName; document; birthDate };
      contactInfo: { email; phone; address };
      travelDates: { departure; return };
      paymentMethod: string;
      specialRequests: string;
      createdAt: string; // ISO timestamp
    };
    ```
  - After saving, shows a confirmation alert and calls `onBack()` to return to the home view.

- `MyReservations` – read-only view of all reservations for the logged-in user.
  - Reads `peruTravelsReservations` from `localStorage`, filters by `userEmail`, and renders each booking with relevant details (trip info, passenger, dates, payment, status).
  - Uses the same image mapping strategy as other components (see below) to show a hero image per reservation.

- `Navbar` – exposes a "Mis Reservaciones" control only when `user` is non-null, and clicking it triggers `onMyReservationsClick` in `App` to change `currentView`.

Whenever you change the reservation model or storage key, ensure that `ReservationView`, `MyReservations`, and any future reporting/analytics components stay in sync.

### Presentation Components and Shared Utilities

- `Navbar` – top navigation bar with brand, contact CTA, and category menu. It conditionally displays user info and the "Mis Reservaciones" entry when a user is logged in.
- `SearchForm` – hero search panel at the top of the home page. Currently mostly presentational; it does not yet drive actual query/filter logic in `App`.
- `DestinationCard` and `PackageCard` – card components that handle layout and presentation of offers using data passed from `App`. They do not manage global state themselves.

Shared image handling:
- `components/figma/ImageWithFallback.tsx` wraps `<img>` with error handling.
  - On load failure, it swaps to a built-in SVG placeholder and preserves the original URL in `data-original-url` for debugging.
  - This component is used by Destination/Package cards, `ReservationView`, and `MyReservations` to keep image error handling consistent.

Shared UI primitives:
- `components/ui/*` contains a full set of reusable primitives (accordion, dialog, dropdown, navigation menu, sidebar, table, tabs, tooltip, etc.), backed by Radix UI and a design-token-based theme.
- These components are mostly unopinionated building blocks; prefer reusing them when adding new interactive elements rather than implementing ad-hoc versions.

### Styling and Design System

- `src/styles/globals.css` defines the design tokens (colors, radii, typography, sidebar theme) using CSS custom properties and an `@theme inline` block.
- `index.css` (imported in `main.tsx`) combines Tailwind layers with the global tokens from `globals.css` to set base typography and body styling.
- Components predominantly use Tailwind-style utility classes. When making new components, follow the existing patterns for spacing, typography, and color (e.g. primary red accent, soft gray backgrounds).

## Notes and Conventions

- Path alias `@` is configured in `vite.config.ts` to point to `./src`, so imports like `@/components/...` can be used.
- Dependency aliases in `vite.config.ts` map versioned import specifiers (e.g. `lucide-react@0.487.0`) back to bare package names. If you see versioned import paths, they resolve via these aliases.
- `src/guidelines/Guidelines.md` is currently a template; it does not yet define additional project-specific rules.
