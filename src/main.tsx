import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "../node_modules/@ginger-society/ginger-ui/dist/esm/index.css";
import "./index.css";

import router from "./shared/router";
import { SnackbarProvider , SystemThemePreferred, AuthProvider} from "@ginger-society/ginger-ui";
import { ValidateTokenResponse } from "./services/IAMService_client";
import { IAMService } from "./services";

const rootElement = document.querySelector('[data-js="root"]') as HTMLElement;

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const validateToken = async (): Promise<ValidateTokenResponse> => {
  return IAMService.identityValidateToken();
};


const root = createRoot(rootElement);
root.render(
  <AuthProvider<ValidateTokenResponse>
      validateToken={validateToken}
      navigateToLogin={() =>
        console.error('Todo : WIP , this is supposed to navigate to login for profile setup page , currently there is only one use case , passeword reset , that the user can do using forget password.')
      }
      postLoginNavigate={() =>
        router.navigate("/manage-workspaces")
      }
    >
    <SnackbarProvider>
      <SystemThemePreferred> 
        <RouterProvider router={router} />
      </SystemThemePreferred>
    </SnackbarProvider>
  </AuthProvider>
);
