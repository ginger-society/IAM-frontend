import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "../node_modules/@ginger-society/ginger-ui/dist/esm/index.css";
import "./index.css";

import { AuthProvider } from "./shared/AuthContext";
import router from "./shared/router";
import { SnackbarProvider } from "@ginger-society/ginger-ui";

const rootElement = document.querySelector('[data-js="root"]') as HTMLElement;

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(rootElement);
root.render(
  <AuthProvider>
    <SnackbarProvider>
      <RouterProvider router={router} />
    </SnackbarProvider>
  </AuthProvider>
);
