import { Outlet } from 'react-router-dom';
import './App.scss';
import { useEffect } from 'react';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { useAppDispatch } from './store';
import { init } from './features/phonesSlice';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(init());

    // тут по умові, якщо пустий то робити JSON.stringify([])
    // localStorage.setItem('cart', JSON.stringify([]));
    // // посуті це не працює, тільки коли напряму в консоль вводжу
    // localStorage.setItem('favourites', JSON.stringify([]));
    //
  }, []);

  return (
    <div className="App">
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
