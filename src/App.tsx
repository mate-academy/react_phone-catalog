import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { loadProducts } from './features/productsSlice';
import { useAppDispatch } from './app/hooks';
import './App.scss';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  return (
    <div className="App">
      <div className="page__body">
        <Header />

        <main>
          <div className="container">
            <div className="
              grid
              grid--desktop"
            >
              <Outlet />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};
