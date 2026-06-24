import "./App.scss";
import "./swiper-custom.scss";
import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export const App: React.FC = () => (
  <div className="App">
    <h1 className="invisible">Product Catalog</h1>
    <Header />
    <div className="container appContainer">
      <Outlet />
    </div>
    <Footer />
  </div>
);
