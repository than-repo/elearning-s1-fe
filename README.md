## Getting Started

First, run the development server:
use npm.cmd like:

```bash
npm run dev
```

```
e-learning-fe
├─ .prettierignore
├─ AGENTS.md
├─ CLAUDE.md
├─ DESIGN_Appple.md
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ prettier.config.js
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ icons
│  ├─ images
│  │  ├─ AI.png
│  │  ├─ auth-illustration.png
│  │  ├─ home-learning-workspace.png
│  │  ├─ logo.png
│  │  ├─ logo.svg
│  │  ├─ nestjs.png
│  │  └─ nextjs.png
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ src
│  ├─ app
│  │  ├─ auth
│  │  │  └─ google
│  │  │     └─ success
│  │  │        └─ page.tsx
│  │  ├─ courses
│  │  │  ├─ page.tsx
│  │  │  └─ [slug]
│  │  │     ├─ page.tsx
│  │  │     └─ payment
│  │  │        └─ page.tsx
│  │  ├─ favicon.ico
│  │  ├─ forgot-password
│  │  │  └─ page.tsx
│  │  ├─ layout.tsx
│  │  ├─ login
│  │  │  └─ page.tsx
│  │  ├─ my-courses
│  │  │  └─ page.tsx
│  │  ├─ page.tsx
│  │  ├─ register
│  │  │  └─ page.tsx
│  │  ├─ reset-password
│  │  │  └─ page.tsx
│  │  └─ _components
│  │     ├─ home-content.ts
│  │     ├─ home-page.tsx
│  │     └─ sections
│  │        ├─ featured-courses-section.tsx
│  │        ├─ final-cta-section.tsx
│  │        ├─ hero-section.tsx
│  │        ├─ role-section.tsx
│  │        └─ stats-section.tsx
│  ├─ components
│  │  ├─ layout
│  │  │  └─ public-navbar
│  │  │     ├─ auth-actions.tsx
│  │  │     ├─ brand-link.tsx
│  │  │     ├─ desktop-nav.tsx
│  │  │     ├─ mobile-nav-link.tsx
│  │  │     ├─ nav-link.tsx
│  │  │     ├─ public-navbar.tsx
│  │  │     └─ user-menu.tsx
│  │  ├─ shared
│  │  └─ ui
│  │     ├─ badge.tsx
│  │     ├─ button-link.tsx
│  │     ├─ README.md
│  │     └─ section-header.tsx
│  ├─ features
│  │  ├─ admin
│  │  ├─ auth
│  │  │  ├─ api
│  │  │  │  └─ auth-api.ts
│  │  │  ├─ components
│  │  │  │  ├─ auth-illustration.tsx
│  │  │  │  ├─ auth-page-shell.tsx
│  │  │  │  ├─ forgot-password-form.tsx
│  │  │  │  ├─ google-auth-button.tsx
│  │  │  │  ├─ google-auth-success.tsx
│  │  │  │  ├─ guest-only-route.tsx
│  │  │  │  ├─ login-form.tsx
│  │  │  │  ├─ protected-route.tsx
│  │  │  │  ├─ register-form.tsx
│  │  │  │  ├─ reset-password-form.tsx
│  │  │  │  └─ role-protected-route.tsx
│  │  │  ├─ hooks
│  │  │  │  └─ use-auth.ts
│  │  │  └─ types
│  │  │     └─ auth.ts
│  │  ├─ categories
│  │  ├─ courses
│  │  │  ├─ api
│  │  │  │  └─ course-api.ts
│  │  │  ├─ components
│  │  │  │  ├─ course-card.tsx
│  │  │  │  ├─ course-catalog-state.tsx
│  │  │  │  ├─ course-detail.tsx
│  │  │  │  ├─ course-filter-summary.tsx
│  │  │  │  ├─ course-filters.tsx
│  │  │  │  ├─ course-grid.tsx
│  │  │  │  ├─ course-image.tsx
│  │  │  │  ├─ course-pagination.tsx
│  │  │  │  ├─ course-search.tsx
│  │  │  │  └─ courses-header.tsx
│  │  │  ├─ types
│  │  │  │  └─ course.ts
│  │  │  └─ utils
│  │  │     └─ course-data.ts
│  │  ├─ enrollments
│  │  │  ├─ api
│  │  │  │  └─ enrollment-api.ts
│  │  │  ├─ components
│  │  │  │  ├─ enrollment-cta.tsx
│  │  │  │  ├─ my-course-card.tsx
│  │  │  │  ├─ my-courses-content.tsx
│  │  │  │  ├─ my-courses-pagination.tsx
│  │  │  │  └─ payment-checkout.tsx
│  │  │  └─ types
│  │  │     └─ enrollment.ts
│  │  ├─ instructor
│  │  ├─ learning
│  │  └─ users
│  ├─ hooks
│  ├─ lib
│  │  ├─ api
│  │  │  ├─ client.ts
│  │  │  └─ README.md
│  │  └─ config
│  │     └─ env.ts
│  ├─ providers
│  │  └─ auth-provider.tsx
│  ├─ styles
│  │  └─ globals.css
│  └─ types
│     └─ api.ts
└─ tsconfig.json

```