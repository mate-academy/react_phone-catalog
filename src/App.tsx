import { Outlet } from 'react-router-dom';
import './App.scss';
import './styles/main.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SideMenu } from './components/SideMenu';
import { useProducts } from './hooks/useProducts';
import { Loader } from './components/Loader';

export const App = () => {
  const { products } = useProducts();

  return (
    <div className="App">
      <h1 className="visually-hidden" id="home">
        Product Catalog
      </h1>
      <Header />

      <SideMenu />

      <div className="container">
        {products.length ? <Outlet /> : <Loader />}
      </div>

      <Footer />
    </div>
  );
};
