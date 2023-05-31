import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./routes/index.jsx";
import { Provider } from "react-redux";
import { store } from "./services/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
