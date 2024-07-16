import { createHashRouter } from "react-router-dom";
import { withAuthHOC } from "./WithAuthHOC";
import Home from "@/pages/Home";
import IndexPage from "@/pages/Index";
import LoginPage from "@/pages/Login";
import RegisterationPage from "@/pages/Registeration";
import ResetPasswordPage from "@/pages/ResetPassword";
import RequestPasswordResetPage from "@/pages/RequestPasswordReset";

const AuthenticatedHome = withAuthHOC(Home);

const router = createHashRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/home",
    element: <AuthenticatedHome />,
  },
  {
    path: "/:app_id/login",
    element: <LoginPage />,
  },
  {
    path: "/:app_id/register/",
    element: <RegisterationPage />,
  },
  {
    path: "/:app_id/reset-password/:token",
    element: <ResetPasswordPage />,
  },
  {
    path: "/:app_id/request-password-link",
    element: <RequestPasswordResetPage />,
  },
]);

export default router;
