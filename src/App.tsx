import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./pages/Footer/Footer";
import { Header } from "./pages/Header/Header";
import './App.scss';

export const App = () => {
  return (
    <>
      <Header />
        <div className="App">
          <div className="App__container">
            <Outlet />
          </div>
        </div>
      <Footer />
    </>
  );
};
