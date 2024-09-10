import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';

import { resetScrollToTop } from './features/scroll/scrollSlice';

import { useAppDispatch, useAppSelector } from './hooks';

import { Header } from './components/Header';
import { SideBar } from './components/SideBar';
import { Footer } from './components/Footer';

import styles from './App.module.scss';
const { app, app__isOpen, app__topPoint } = styles;

export const App = () => {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector((state) => state.menu.isOpen);

  // * invisible ref with no size to be able to scroll to the top
  // * with each page change
  const { shouldScrollToTop, behavior } = useAppSelector(
    (state) => state.scroll,
  );

  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldScrollToTop) {
      topRef.current?.scrollIntoView({ behavior });

      dispatch(resetScrollToTop());
    }
  }, [shouldScrollToTop, dispatch]);

  return (
    <div className={`${app} ${isOpen && app__isOpen}`}>
      <div ref={topRef} className={app__topPoint} id="topOfThePage" />

      <Header />

      <SideBar />

      <Outlet />

      <Footer />
    </div>
  );
};
