import React, { useEffect } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { Phones } from './pages/Phones/Phones';
import { Cart } from './pages/Cart/Cart';
import { Favourites } from './pages/Favourites/Favourites';
import { Basket } from './pages/Basket/Basket';
import { phonesAsync } from './features/phonesSlice/phonesSlice';
import { useAppDispatch } from './app/hooks';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(phonesAsync());
  }, []);

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/phones"
          element={(<Phones />)}
        />
        <Route
          path="/phones/*"
          element={(<Cart />)}
        />
        <Route
          path="/tablets"
          element={(<Phones />)}
        />
        <Route
          path="/tablets/*"
          element={(<Cart />)}
        />
        <Route
          path="/accessories/"
          element={(<Phones />)}
        />
        <Route
          path="/accessories/*"
          element={<Cart />}
        />
        <Route
          path="/favourites"
          element={<Favourites />}
        />
        <Route
          path="/cart"
          element={<Basket />}
        />
      </Routes>
    </div>
  );
};

export default App;
