# SHARO KEBAB QR Loyalty + AI Marketing

REAL/PARTIAL demo app pentru SHARO KEBAB, Bucuresti. Stack: Next.js App Router, TypeScript, Tailwind, Supabase-ready, OpenAI API route, QR generator.

## Local development

```bash
npm.cmd install
npm.cmd run dev
```

Deschide `http://localhost:3000/sharo-kebab`.

Pe PowerShell, foloseste `npm.cmd`, nu `npm`, daca execution policy blocheaza scripturile.

## Premium visuals

Background:

- Pune fotografia reala cu storefront / restaurant SHARO KEBAB la `public/images/sharo-bg.jpg`.
- App-ul aplica automat: fixed cover, blur `18px`, brightness `25%`, scale `1.12`, overlay negru puternic, glow orange/red, smoke/fog, vignette, grain si parallax subtil.
- Daca imaginea lipseste, ramane fallback gradient dark cinematic.

Product images:

- Pune imaginile produselor in `public/images/products/`:
  - `cheese-pui.jpg`
  - `cheese-vita.jpg`
  - `cheese-berbecut.jpg`
  - `arabeasca-pui.jpg`
  - `ayran.jpg`
  - `baclava.jpg`
- Daca lipsesc, cardurile folosesc placeholder gradient premium si nu crapa.
- In acest demo exista JPG-uri generate local pentru produse. Nu sunt poze oficiale Glovo/Wolt. Pentru productie, foloseste asset-uri primite de la SHARO KEBAB sau imagini pentru care restaurantul are drept de folosire.
- Product cardurile au hover zoom, light sweep, steam/smoke, glow border si fallback gradient animat.

Premium UX:

- Landing-ul include `AI recomandă azi` si `Top SHARO Legends`.
- Stamp cardul are progres pana la 15 stampile: 5 bonus, 10 VIP, 15 SHARO LEGEND.
- Fundalul include particule ember/dust si respecta `prefers-reduced-motion`.

Sound effects:

- Optional, pune fisierele in `public/sounds/`:
  - `hover.mp3`
  - `click.mp3`
  - `stamp.mp3`
- Sunetul este OFF by default. Clientul il activeaza din butonul `Sound ON/OFF`.
- Preferinta se salveaza in `localStorage`.
- Daca fisierele lipsesc, app-ul nu crapa.
- Daca MP3-urile lipsesc, app-ul foloseste fallback Web Audio sintetic pentru hover/click/stamp. Pentru sunet in browser, clientul trebuie sa apese o data `Activeaza sunet`.

Logo oficial:

- Logo-ul curatat din screenshot este salvat la `public/images/sharo-logo-official.png`.
- `BrandMark` si `business.logo_url` folosesc asset-ul acesta.
- Daca primesti fisier vectorial oficial de la restaurant, inlocuieste acest PNG cu versiunea oficiala pastrand acelasi path sau actualizeaza `lib/data.ts`.

Muzica ambient:

- App-ul include muzica procedurala Web Audio, low BPM, originala, fara copyright.
- Browserul nu permite muzica cu volum fara gest de utilizator; apasa `Activeaza sunet` sau interactioneaza cu pagina dupa ce preferinta e ON.
- Daca ai un MP3 oficial, il poti pune ulterior la `public/sounds/background.mp3` si inlocui generatorul procedural.

## Environment

Copiaza `.env.example` in `.env.local` si completeaza:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
SHARO_ADMIN_EMAIL=admin@sharokebab.ro
```

Fara `OPENAI_API_KEY`, `/api/ai` raspunde MOCK. Fara Supabase, formularul loyalty merge demo in memorie si marcheaza raspunsurile MOCK.

## Pages

- `/sharo-kebab` public QR landing page
- `/sharo-kebab/loyalty` digital stamp card
- `/sharo-kebab/stamp?token=...` secret staff QR stamp validation
- `/sharo-kebab/menu` premium menu
- `/sharo-kebab/review` Google review booster + private feedback
- `/sharo-kebab/refer` referral page
- `/admin/login` admin login demo
- `/admin/dashboard` analytics
- `/admin/customers` customer management
- `/admin/offers` offer management
- `/admin/menu` menu editor
- `/admin/qr` QR generator + PNG download
- `/admin/qr-staff` secret staff QR generator + rotation
- `/admin/ai` AI marketing assistant
- `/admin/settings` business settings

## Supabase setup

1. Creeaza proiect Supabase.
2. Ruleaza `supabase/schema.sql` in SQL editor.
3. Ruleaza `supabase/seed.sql`.
4. Pune URL, anon key si service role key in `.env.local`.
5. Creeaza admin user in Supabase Auth: `admin@sharokebab.ro`.

Schema include tabelele cerute: businesses, customers, visits, rewards, offers, menu_items, referrals, qr_scans, ai_generations, review_clicks, whatsapp_clicks, plus private_feedback.
Schema include si `staff_qr_tokens` + `stamp_events` pentru QR-ul secret de staff.

## Anti-fraud

- Telefon romanesc validat server-side.
- Telefon unic per business in schema.
- Public QR nu adauga stampile. Public QR doar deschide VIP Club, meniu, review, WhatsApp si formularul de inscriere.
- Stampilele se adauga doar prin QR-ul secret de staff: `/sharo-kebab/stamp?token=SECURE_RANDOM_TOKEN`.
- Tokenul staff este validat server-side in `/api/stamp`.
- Max 1 stampila / client / 6 ore in `/api/stamp`.
- Rate-limit simplu pe IP pentru formular public.
- Failed token attempts sunt logate in `stamp_events`.
- Admin poate face override manual prin dashboard cand legi actiunile la Supabase.

## Public QR vs Secret Staff QR

Public QR:

- Se pune pe mese, pungi, geam, bon sau social.
- Trimite clientul la `/sharo-kebab`.
- Nu poate adauga stampile.

Secret staff QR:

- Se genereaza din `/admin/qr-staff`.
- Trebuie tinut la casa si aratat doar dupa plata.
- Staff-ul poate roti tokenul si seta expirare daily, weekly, monthly sau never expire.
- Cand tokenul este rotit, tokenul vechi devine inactiv.
- Clientul scaneaza QR-ul secret dupa plata, introduce telefonul daca nu este deja salvat local si primeste 1 stampila daca nu este in cooldown.

Reward claim:

- Reward-urile nu se revendica automat de client.
- La 5 sau 10 stampile, clientul vede mesajul `Arata acest ecran la casa pentru reward`.
- Staff-ul confirma reward-ul manual in admin.

## OpenAI

`/api/ai` face call server-side la OpenAI cand `OPENAI_API_KEY` exista. Cheia nu ajunge in frontend. Daca API-ul lipseste sau cade, route-ul intoarce raspuns MOCK util pentru demo.

## Vercel deployment

1. Push repository.
2. Import in Vercel.
3. Seteaza env vars din `.env.example`.
4. Deploy.
5. Seteaza `NEXT_PUBLIC_SITE_URL` la domeniul Vercel.
6. Genereaza QR-urile din `/admin/qr`.

## Status

PARTIAL production-ready: UI, routes, schema, seed si server API exista. Pentru productie completa mai trebuie conectate formularele admin la Supabase mutations, middleware real pentru protectie admin si link Google review real din profilul Google Business.
