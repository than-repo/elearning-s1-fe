## Getting Started

First, run the development server:
use npm.cmd like:

```bash
npm run dev
```

## Base Folders

- `src/app/`: Next App Router routes and layouts only.
- `src/components/ui/`: reusable primitive UI components later.
- `src/components/layout/`: app shells, headers, sidebars later.
- `src/components/shared/`: generic shared UI states later.
- `src/features/`: feature-owned code, grouped by domain.
- `src/lib/`: framework-independent helpers such as API/auth/config later.
- `src/hooks/`: reusable React hooks later.
- `src/providers/`: app-level providers later.
- `src/types/`: shared TypeScript types later.
- `public/images/`, `public/icons/`: static assets.

## rules:

1. `/src/app`
   app/ should route and compose.
2. `/src/componets/ui`
   components/ui/ must be business-blind.
3. `src/components/layout
   components/layout/ is for reusable page structure, not business features.
4. `src/components/shared
   shared/ can be reusable, but it should not become a trash folder.
5. `src/features
   features/ should contain the real feature logic.
   If a file belongs to one business domain, put it in features/[domain]/.
6. `src/lib`
   `lib/` is for **shared helper code**.
7. `src/hooks
   Global reusable hook -> src/hooks/Feature-specific hook -> src/features/[feature]/hooks/
8. `src/providers/`
   providers/ is for global wrappers used near root layout.
9. `src/types
   Used by many features? -> src/types/
   Used by one feature only? -> src/features/[feature]/types/
10. `public/images/` and `public/icons/`
    public/ is for static app assets, not dynamic user-uploaded files.
