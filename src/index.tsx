import { createRoot } from 'react-dom/client';
import { App } from './App';
import { GlobalProvider } from './context/ContextReducer';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Sidebar } from './componentsApp/SideBar/Sidebar';
import { HomePage } from './moduls/HomePage/HomePage/HomePage';
import { ItemCard } from './moduls/ItemCard/ItemCard';
import { PhoneCatalog } from './moduls/PhonesCatalog/Phone';
import { TabletsCatalog } from './moduls/TabletsCatalog/Tablets';
import { AccessoriesCatalog } from './moduls/AccessoriesCatalog/Accessories';
import { Favorites } from './moduls/Favourites/Favorites';
import { Cart } from './moduls/Cart/Cart';
import { PageNotFound } from './componentsApp/PageNotFound/PageNotFound';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <GlobalProvider>
      <Routes>
        <Route path="/react_phone-catalog" element={<App />}>
          <Route index element={<HomePage />} />

          <Route path="react_phone-catalog:productId" element={<ItemCard />} />

          <Route
            path="react_phone-catalog/phones/:productId"
            element={<ItemCard />}
          />

          <Route
            path="react_phone-catalog/tablets/:productId"
            element={<ItemCard />}
          />

          <Route
            path="react_phone-catalog/accessories/:productId"
            element={<ItemCard />}
          />

          <Route
            path="react_phone-catalog/favorites/:productId"
            element={<ItemCard />}
          />

          <Route path="react_phone-catalog/phones" element={<PhoneCatalog />} />

          <Route
            path="react_phone-catalog/tablets"
            element={<TabletsCatalog />}
          />

          <Route
            path="react_phone-catalog/accessories"
            element={<AccessoriesCatalog />}
          />

          <Route path="react_phone-catalog/favorites" element={<Favorites />} />

          <Route path="react_phone-catalog/card" element={<Cart />} />

          <Route path="#" element={<PageNotFound />} />
        </Route>

        <Route path="react_phone-catalog/sidebar" element={<Sidebar />} />
      </Routes>
    </GlobalProvider>
  </Router>,
);
