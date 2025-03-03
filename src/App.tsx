import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { FavouritesProvider } from './modules/shared/context/FavouritesContext';
import { HomePage } from './modules/HomePage/components/HomePage';
import { Favorites } from './modules/Favourites/Favorites';
import {
  ProductsProvider,
  useProducts,
} from './modules/shared/context/ProductsContext';
import { GadgetPage } from './modules/GadgetPage/GadgetPage';

export const App = () => {
  const { phones, tablets, accessories } = useProducts();

  return (
    <ProductsProvider>
      <FavouritesProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/phones" element={<GadgetPage gadgets={phones} />} />
            <Route path="/tablets" element={<GadgetPage gadgets={tablets} />} />
            <Route
              path="/accessories"
              element={<GadgetPage gadgets={accessories} />}
            />
          </Routes>
        </div>
      </FavouritesProvider>
    </ProductsProvider>
  );
};
