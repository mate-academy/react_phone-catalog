import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from './components/Header';
import { loadGoods, isLoading } from './store/index'
import { Body } from './components/Body';
import { Footer } from './components/Footer';
import { CartContextWrapper } from './components/CartContext';
import { FavouritesContextWrapper } from './components/FavouritesContext';
import './styles/main.scss';
import { Preloader } from './components/Preloader';

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  /*const cart: cartGood[] = useSelector(getCartGoods);
  const favorites: Good[] = useSelector(getFavouritesGoods);*/

  useEffect(() => {
    dispatch(loadGoods());
  }, [])

 /* useEffect(() => {
    localStorage.setItem('cartItem', JSON.stringify([...cart]));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favoriteProducts', JSON.stringify([...favorites]));
  }, [favorites]);*/

    return (
    <div className="App">

            {loading
            ? <Preloader />
            :  (<CartContextWrapper>
                <FavouritesContextWrapper>
                  <Header />
                  <Body />
                  <Footer />
                </FavouritesContextWrapper>
              </CartContextWrapper>
            )}


    </div>
  );
}

export default App;
