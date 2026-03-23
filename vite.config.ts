/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    env: {
      VITE_WEATHER_API_BASE_URL: 'https://api.openweathermap.org/data/2.5',
      VITE_WEATHER_API_KEY: 'test-api-key',
    },
  },
});
