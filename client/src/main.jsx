
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

// Styles globaux
import "./styles/main.scss";

// Initialisation de l'application React
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/site">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
