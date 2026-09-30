import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser', fullyParallel: false, workers: 1,
  use: { channel: 'chromium', baseURL: 'http://127.0.0.1:5173', viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true },
  webServer: { command: 'npm.cmd run dev -- --port 5173', url: 'http://127.0.0.1:5173', reuseExistingServer: true },
});

