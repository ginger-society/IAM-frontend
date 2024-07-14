import { createHashRouter } from "react-router-dom";
import { withAuthHOC } from "./WithAuthHOC";
import Home from "@/pages/Home";
import IndexPage from "@/pages/Index";
import LoginPage from "@/pages/Login";

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
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
