import React from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { getCurrencies, getModels, getPayment } from "./api/apis";
import { Auth } from "./components/Auth";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Invest } from "./screens/Invest/Invest";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Auth isLogin>
        <Navigate to="/invest" />
      </Auth>
    ),
  },
  {
    path: "/invest",
    element: (
      <Auth>
        <Invest />
      </Auth>
    ),
    loader: async () => {
      const currencies = await getCurrencies();
      const models = await getModels();
      const payment = await getPayment();
      return {
        currencies: (await currencies.json()).data,
        models: (await models.json()).data,
        payment: (await payment.json()).data,
      };
    },
  },
  {
    path: "/",
    element: (
      <Auth>
        <Navigate to="/invest" />
      </Auth>
    ),
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
