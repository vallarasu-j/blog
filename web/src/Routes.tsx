import { useRoutes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import Dashborad from "./pages/admin/Dashborad";
import Posts from "./pages/admin/Posts";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const Routes = () => {
  return useRoutes([
    {
      path: "/",
      element: <UserLayout />,
      children: [
        { path: "", element: <Home /> },
        { path: "home", element: <Home /> },
      ],
    },
    {
      path: "/",
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
    {
      path: "/admin/",
      element: <AdminLayout />,
      children: [
        { path: "dashboard", element: <Dashborad /> },
        { path: "posts", element: <Posts /> },
      ],
    },
  ]);
};

export default Routes;
