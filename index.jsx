import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import App from "./App";
import Home from "./component/Home";
import Error404Page from "./component/Error404Page";
import CountryDetails from "./component/CountryDetails";
import Contact from "./component/Contact";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error404Page />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/:country",
                element: <CountryDetails />,
            },
        ]
    },
    

]);

const root = createRoot(document.querySelector("#root"));

root.render(<RouterProvider router={router} />);
