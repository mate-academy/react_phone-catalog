import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { categoriesArr, CategoriesContext } from './Context';
import { ProductsProvider } from './Context/ProductsContext';
import './App.scss';

export const App = () => (
  <CategoriesContext.Provider value={categoriesArr}>
    <ProductsProvider>
      <div className="App">
        <Header />
        <div className="styled_container">
          <main className="main">
            <div className="container main_container">
              <Outlet />
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </ProductsProvider>
  </CategoriesContext.Provider>
);
