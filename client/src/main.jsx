import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import Lobby from "./routes/Lobby";
import "./index.css";
import Join from "./routes/HomeChildren/Join";
import HomeDefault from "./routes/HomeChildren/HomeDefault";
import Host from "./routes/HomeChildren/Host";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "/", element: <HomeDefault /> },
      { path: "/join", element: <Join /> },
      { path: "/host", element: <Host /> },
    ],
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
