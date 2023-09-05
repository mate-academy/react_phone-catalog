import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { Navigation } from './Components/Navigation';
import { HomePage } from './Pages/Home';
import { NotFound } from './Pages/NotFound';
import { PhonesPage } from './Pages/Phones';
import { TabletsPage } from './Pages/Tablets';
import { AccessoriesPage } from './Pages/Accessories';
import { FavouritesPage } from './Pages/Favourites';
import { ShoppingPage } from './Pages/Shopping';
import { Footer } from './Components/Footer';

export const App = () => {
  return (
    <div className="App">
      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/Phones" element={<PhonesPage />} />
        <Route path="/Tablets" element={<TabletsPage />} />
        <Route path="/Accessories" element={<AccessoriesPage />} />
        <Route path="/Favourites" element={<FavouritesPage />} />
        <Route path="/Shopping" element={<ShoppingPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
};
