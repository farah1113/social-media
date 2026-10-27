import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import Explore from "../pages/Explore/Explore";
import Bookmarks from "../pages/Bookmarks/Bookmarks";
import Notifications from "../pages/Notifications/Notifications";
import Profile from "../pages/Profile/Profile";

import ProtectedRoute from "./ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  // Public routes
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  // Protected routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/home",
            element: <Home />,
          },
          {
            path: "/explore",
            element: <Explore />,
          },
          {
            path: "/bookmarks",
            element: <Bookmarks />,
          },
          {
            path: "/notifications",
            element: <Notifications />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}