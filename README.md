# Quran App

A modern, responsive web application to read and search the Holy Quran — built with Next.js, TypeScript, and Tailwind CSS.

---

## Features

- **Surah List** — Browse all 114 surahs with Arabic name, English transliteration, translation, verse count, and revelation type (Meccan/Medinan)
- **Ayat Page** — Read all verses of any surah with Arabic text and English translation side by side
- **Search** — Full-text search across all 6,236 verse translations with highlighted results
- **Settings Sidebar** — Customize your reading experience with font selection, Arabic font size, and translation font size — all persisted to localStorage
- **Static Site Generation** — All 114 surah pages pre-rendered at build time for instant load

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router, SSG) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Arabic Fonts | Amiri, Scheherazade New (Google Fonts) |
| Data | quran-json (npm package) |
| Linting | ESLint + Next.js ruleset |

---

## Project Structure

```
quran-app/
├── data/
│   └── quran_en.json          # Quran data — 114 surahs, 6236 ayahs
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with Navbar + SettingsProvider
│   │   ├── page.tsx            # Home — Surah list page
│   │   ├── search/
│   │   │   └── page.tsx        # Search page
│   │   └── surah/
│   │       └── [id]/
│   │           └── page.tsx    # Dynamic Ayat page (SSG)
│   ├── components/
│   │   ├── ayah/
│   │   │   ├── AyahBlock.tsx   # Single verse with Arabic + translation
│   │   │   └── AyahList.tsx    # List of AyahBlocks
│   │   ├── layout/
│   │   │   └── Navbar.tsx      # Sticky navbar with active link state
│   │   ├── settings/
│   │   │   └── SettingsPanel.tsx # Slide-in settings sidebar
│   │   ├── surah/
│   │   │   ├── SurahCard.tsx   # Single surah list item
│   │   │   └── SurahHeader.tsx # Surah detail header card
│   │   └── ui/
│   │       ├── SearchBar.tsx        # Debounced search input
│   │       └── SearchResultCard.tsx # Search result with highlight
│   ├── context/
│   │   └── SettingsContext.tsx # Global settings provider
│   ├── hooks/
│   │   └── useSettings.ts      # Settings hook with localStorage persistence
│   ├── lib/
│   │   └── quran.ts            # Data helpers — getAllSurahs, getSurahById, searchAyahs
│   └── types/
│       ├── quran.ts            # Surah, Ayah, SearchResult interfaces
│       └── settings.ts         # Settings interface + defaults
├── .gitignore
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/rabiul-bipul/quran-app.git
cd Quran-app/quran-app

# Install dependencies
npm install

# Copy Quran data from the npm package into the data folder
node -e "const fs=require('fs'); fs.copyFileSync('./node_modules/quran-json/dist/quran_en.json','./data/quran_en.json'); console.log('Done!')"
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Home page — list of all 114 surahs |
| `/surah/[id]` | Ayat page — all verses for a given surah (1–114) |
| `/search?q=...` | Search results — filtered by translation text |

---

## Settings

All settings are saved to `localStorage` and persist across sessions.

| Setting | Options | Default |
|---|---|---|
| Arabic Font | Amiri, Scheherazade New | Amiri |
| Arabic Font Size | 20px – 48px | 32px |
| Translation Font Size | 12px – 24px | 16px |

---

## Data Source

Quran data is sourced from the [`quran-json`](https://github.com/risan/quran-json) npm package:

- **Arabic text** — Uthmani script from The Noble Qur'an Encyclopedia
- **English translation** — Sahih International
- **Coverage** — All 114 surahs, 6,236 verses

---

## Development Practices

- **TypeScript strict mode** — all props and return types are explicitly typed
- **Server Components by default** — `"use client"` only used where interactivity is required
- **SSG** — `generateStaticParams` pre-renders all surah pages at build time
- **RTL support** — all Arabic text uses `dir="rtl"` and `lang="ar"`
- **Conventional commits** — `feat:`, `fix:`, `refactor:` prefixes throughout
- **Module-level caching** — Quran data is parsed once and cached for the lifetime of the server process

---

## License

This project is open source and available.

---

## Acknowledgements

- [risan/quran-json](https://github.com/risan/quran-json) for the Quran dataset
- [Google Fonts](https://fonts.google.com) for Amiri and Scheherazade New Arabic typefaces
- [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com)