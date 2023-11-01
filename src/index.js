import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import DashboardPage from "./pages/DashboardPage";
import { Provider } from "react-redux";
import store from "./store";
import WebcamStream from "./pages/webcam-feed";
import "font-awesome/css/font-awesome.min.css";
import LiveStreamPage from "./pages/LiveStreamPage";
import DestinationPage from "./pages/DestinationPage";
import Broadcasting from "./components/Broadcasting";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/stream",
        element: <LiveStreamPage />,
      },
      {
        path: "/destinations",
        element: <DestinationPage />,
      },
      {
        path: "/broadcast",
        element: <Broadcasting />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
