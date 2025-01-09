import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header, HeaderOrigin } from './components/PageTopComponents/Header';
import { Menu } from './components/PageTopComponents/Menu';
import { useAppDispatch } from './app/hooks';
import { useEffect } from 'react';
import { setScreenWidth } from './features/globalSlice';
import { debounce } from 'lodash';
import { Footer } from './components/Footer';
import { initProducts } from './features/productSlice';

export const App = () => {
  const dispatch = useAppDispatch();

  /* get productList from server. I do this in App because this list
  is needed in several components that are all child of App */
  useEffect(() => {
    dispatch(initProducts());
  }, [dispatch]);

  // recalculate screenWidth everytime it changes
  useEffect(() => {
    const handleResize = debounce(() => {
      dispatch(setScreenWidth(window.innerWidth));
    }, 200);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  return (
    <div className="App">
      <Header origin={HeaderOrigin.ONPAGE} />
      <Menu />
      <div className="outlet-container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
