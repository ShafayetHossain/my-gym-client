import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";
import Home from "./components/Home";
import AddSchedule from "./components/AddSchedule";
import AllSchedule from "./components/AllSchedule";
import Provider from "./components/Provider";
import UpdateUser from "./components/UpdateUser";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import SignUp from "./components/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/add-schedule",
        element: (
          <PrivateRoute>
            <AddSchedule></AddSchedule>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-schedule",
        loader: () => fetch("http://localhost:3000/gym"),
        element: <AllSchedule></AllSchedule>,
      },
      {
        path: "/update-schedule/:id",
        loader: ({ params }) => fetch(`http://localhost:3000/gym/${params.id}`),
        element: (
          <PrivateRoute>
            <UpdateUser></UpdateUser>
          </PrivateRoute>
        ),
      },
      {
        path: "/sign-in",
        element: <Login></Login>,
      },
      {
        path: "/sign-up",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
