import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./store/hooks";
import * as productAction from '../app/store/slices/productSlice';

import { Header } from "../modules/shared/components/Header";
import { Footer } from "../modules/shared/components/Footer";

import "../styles/index.scss";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpenNav = useAppSelector(state => state.ui.isOpenNav);

  useEffect(() => {
    dispatch(productAction.fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', isOpenNav);

    return () => {
      document.body.classList.remove('no-scroll');
    }
  }, [isOpenNav]);

  return (
    <>
      <Header/>
      <main className={"container"}>
        <Outlet/>
      </main>
      <Footer />
    </>
  );
};

export default App;
