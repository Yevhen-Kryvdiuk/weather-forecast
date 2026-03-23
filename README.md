# Weather Forecast

React application that fetches weather data from the OpenWeatherMap API and displays it with search history management.

## Features

- Search weather by city name
- Display current temperature, description, min/max, wind speed, humidity
- Search history with localStorage persistence
- Click history item to re-fetch weather
- Remove history items with undo support (5-second window)
- Responsive layout (mobile + desktop)
- Error handling with user-friendly messages
- Error Boundary for unexpected React errors

## Tech Stack

- **React 19** + **TypeScript** (strict mode)
- **Vite** — build tool
- **CSS Modules** — component-scoped styles
- **Axios** — HTTP client
- **Vitest** + **React Testing Library** + **MSW** — testing

## Getting Started

### Prerequisites

- Node.js v20+
- npm

### Installation

```bash
npm install
```

### Configuration

```bash
cp .env.example .env
```

Edit `.env` and add your OpenWeatherMap API key:

```env
VITE_WEATHER_API_KEY=your_api_key_here
VITE_WEATHER_API_BASE_URL=https://api.openweathermap.org/data/2.5
```

Get a free API key at [openweathermap.org](https://openweathermap.org/api).

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

### Testing

```bash
npm run test            # Run tests
npm run test:coverage   # Run with coverage report
npm run lint            # Lint code
npm run format          # Format with Prettier
```

## Architecture

```
src/
├── components/       # UI components (each in own folder with .tsx + .module.css + .test.tsx)
│   ├── UI/           # Reusable: Button, Loader, ErrorMessage, UndoNotification
│   ├── SearchBar/    # City search input
│   ├── WeatherCard/  # Weather data display
│   ├── SearchHistory/# History list with remove
│   └── ErrorBoundary/# React error boundary
├── hooks/            # useWeather (API + state), useSearchHistory (context wrapper)
├── services/         # weatherApi.ts — Axios instance, API calls, response mapping
├── context/          # SearchHistoryContext — useReducer + localStorage sync
├── types/            # TypeScript interfaces (WeatherData, SearchHistoryItem, etc.)
├── constants/        # API config, error messages, storage keys
├── utils/            # localStorage helpers
└── test/             # Test setup, MSW handlers, custom render
```

**Data flow:** SearchBar -> useWeather (API call) -> WeatherCard. Search history is managed via Context + useReducer, synced to localStorage.

## Design Decisions

- **CSS Modules** over CSS-in-JS for zero-runtime styling and natural CSS support
- **useReducer + Context** for search history — simple enough to avoid external state libraries
- **MSW** for API mocking — tests hit realistic request/response flows
- **AbortController** in useWeather — cancels in-flight requests on new search or unmount
- **Named exports only** — consistent imports, better tree-shaking
- **Error mapping in service layer** — components receive user-friendly strings, not HTTP details

## Test Coverage

- 66 tests across 14 test files
- 95%+ statement coverage, 96%+ line coverage
