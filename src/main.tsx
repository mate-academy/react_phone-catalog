import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AppContextContainer } from "./context/AppContext.tsx";
import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContextContainer>
      <HashRouter>
        <App />
      </HashRouter>
    </AppContextContainer>
  </React.StrictMode>
);
