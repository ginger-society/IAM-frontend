import { createHashRouter } from "react-router-dom";
import { withAuthHOC } from "@ginger-society/ginger-ui";
import Home from "@/pages/Home";
import IndexPage from "@/pages/Index";
import LoginPage from "@/pages/Login";
import RegisterationPage from "@/pages/Registeration";
import ResetPasswordPage from "@/pages/ResetPassword";
import RequestPasswordResetPage from "@/pages/RequestPasswordReset";
import ConfirmRegistrationPage from "@/pages/ConfirmRegistration";
import AcceptInvite from "@/pages/AcceptInvite";
import LogoutPage from "@/pages/Logout";

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
    path: "/accept-invite/:token",
    element: <AcceptInvite />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/:app_id/login",
    element: <LoginPage />,
  },
  {
    path: "/:app_id/logout",
    element: <LogoutPage />,
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
  {
    path: "/:app_id/registration-confirmation/:registration_token",
    element: <ConfirmRegistrationPage />,
  },
]);

export default router;
