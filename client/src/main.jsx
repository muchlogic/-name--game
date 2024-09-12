import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import Lobby from "./routes/Lobby";
import Test from "./routes/Test";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/lobby/:roomID",
    element: <Lobby />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
  // <StrictMode>

  // </StrictMode>
);
