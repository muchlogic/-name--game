import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Home from "./routes/Home";
import Lobby from "./routes/Lobby";
import "./index.css";
import Join from "./routes/HomeChildren/Join";
import HomeDefault from "./routes/HomeChildren/HomeDefault";
import Host from "./routes/HomeChildren/Host";
import ErrorPage from "./routes/ErrorPage";
import CreateCard from "./routes/CreateCard";

const theme = createTheme({
  typography: {
    fontSize: 20,
    fontFamily: "HalfTerm, arial, sans-serif",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "/", element: <HomeDefault /> },
      { path: "/join", element: <Join /> },
      { path: "/host", element: <Host /> },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/lobby/:roomID",
    element: <Lobby />,
    errorElement: <ErrorPage />,
  },
  { path: "/create", element: <CreateCard />, errorElement: <ErrorPage /> },
]);

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    {/* <CssBaseline /> Provides a consistent baseline for MUI components */}
    <RouterProvider router={router} />
  </ThemeProvider>
  // <StrictMode>

  // </StrictMode>
);
