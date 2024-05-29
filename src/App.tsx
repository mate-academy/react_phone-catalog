import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";

import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";

import {actions as productsActions} from "./features/productsSlice";
import {useAppDispatch} from "./app/hooks";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await fetch("/api/phones.json");
        const localPhones = await response.json();

        dispatch(productsActions.setPhones(localPhones));
      } catch (error) {
        return;
      }
    };

    const fetchTablets = async () => {
      try {
        const response = await fetch("/api/tablets.json");
        const localTablets = await response.json();

        dispatch(productsActions.setTablets(localTablets));
      } catch (error) {
        return;
      }
    };

    fetchPhones();
    fetchTablets();
  });

  return (
    <div className="page_wrapper">
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
