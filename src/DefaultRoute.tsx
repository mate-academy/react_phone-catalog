import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';
import './App.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { fetchProducts } from './features/productsSlice';
import { Modal } from './components/Modal/Modal';
import { hideCartModal, hideFavouriteModal } from './features/modalSlice';

export const DefaultRoute = () => {
  const dispatch = useAppDispatch();
  const {
    shouldCartModalBeShow,
    shouldFavouriteModalBeShow,
  } = useAppSelector(state => state.modal);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (shouldFavouriteModalBeShow) {
      setTimeout(() => {
        dispatch(hideFavouriteModal());
      }, 3000);
    }
  }, [shouldFavouriteModalBeShow, dispatch]);

  useEffect(() => {
    if (shouldCartModalBeShow) {
      setTimeout(() => {
        dispatch(hideCartModal());
      }, 3000);
    }
  }, [shouldCartModalBeShow, dispatch]);

  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <Outlet />
      </main>

      {shouldCartModalBeShow && <Modal type="cart" />}
      {shouldFavouriteModalBeShow && <Modal type="favourite" />}

      <Footer />
    </div>
  );
};
