import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import './App.scss';
import { Footer } from './components/Footer';
import { DispatchContext } from './store/State';

export const App = () => {
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    const favoriteProducts = localStorage.getItem('favoriteProducts');

    if (!favoriteProducts) {
      localStorage.setItem('favoriteProducts', JSON.stringify([]));
    } else {
      dispatch({
        type: 'updateFavorite',
        payload: JSON.parse(favoriteProducts),
      });
    }
  }, []);

  return (
    <div className="App">
      <Header />

      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};
