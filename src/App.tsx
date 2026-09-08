import { Outlet } from 'react-router-dom';
import 'bulma/css/bulma.css';
import './App.scss';
import Header from './modules/shared/components/Header/Header';
import Footer from './modules/shared/components/Footer/Footer';
import { useAppDispatch } from './api/hooks';
import { useEffect } from 'react';
import { setProducts } from './features/products/productsSlice';
import { setPhones } from './features/phones/phonesSlice';
import { setTablets } from './features/tablets/tabletsSlice';
import { setAccessories } from './features/accessories/accessories';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setProducts());
    dispatch(setPhones());
    dispatch(setTablets());
    dispatch(setAccessories());
  }, [dispatch]);

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

// add 5s timer to slide banner and infinity slider +
// add grid
// add gap between section +
// add categories section amount of product
// add transform to images
// channge images in main slider
