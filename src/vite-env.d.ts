/// <reference types="vite/client" />

declare global {
  interface Window {
    CONFIG?: Record<string, string>;
  }
}