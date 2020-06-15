import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from './components/Header';
import { loadGoods, isLoading } from './store/index'
import { Body } from './components/Body';
import { Footer } from './components/Footer';
import { getCartGoods, getFavouritesGoods } from './store';
import './styles/main.scss';
import { Preloader } from './components/Preloader';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const loading = useSelector(isLoading);
  const cart: cartGood[] = useSelector(getCartGoods);
  const favorites: Good[] = useSelector(getFavouritesGoods);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    dispatch(loadGoods());
  }, [dispatch])

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify([...cart]));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favoriteProducts', JSON.stringify([...favorites]));
  }, [favorites]);

    return (
    <div className="App">
      {loading
      ? <Preloader />
      :  (
        <>
          <Header />
          <Body />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
