import { createRoot } from 'react-dom/client';
import { App } from './App';
// import { PhonesProvider } from './contexts/PhonesContext';
// import { TabletProvider } from './contexts/TabletsContext';
// import { AccessoriesProvider } from './contexts/AccessoriesContext';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { ScrollToTopOnPhonePage } from './utils/ScrollToTopOnPhonePage';
import { CategoryPage } from './pages/CategoryPage/CategoryPage';
// eslint-disable-next-line max-len
import { CardDescription } from './pages/CardDescriptionPage/CardDescriptionPage';
import { FavouritesProvider } from './contexts/FavouritesContexr';
import { CartProvider } from './contexts/CartContext';
import { CartPage } from './pages/CartPage';

createRoot(document.getElementById('root') as HTMLElement).render(
  // <PhonesProvider>
  // <TabletProvider>
  // <AccessoriesProvider>
  <CartProvider>
    <FavouritesProvider>
      <Router>
        <ScrollToTopOnPhonePage />
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path=":category/" element={<CategoryPage />} />
            <Route path=":category/:itemId" element={<CardDescription />} />
            <Route path="cart" element={<CartPage />} />
          </Route>
        </Routes>
      </Router>
    </FavouritesProvider>
  </CartProvider>,
  //     </AccessoriesProvider>
  //   </TabletProvider>
  // </PhonesProvider>,
);
