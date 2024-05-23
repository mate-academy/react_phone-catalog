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
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />

          <Route path=":productId" element={<ItemCard />} />

          <Route path="/phones/:productId" element={<ItemCard />} />

          <Route path="/tablets/:productId" element={<ItemCard />} />

          <Route path="/accessories/:productId" element={<ItemCard />} />

          <Route path="/favorites/:productId" element={<ItemCard />} />

          <Route path="phones" element={<PhoneCatalog />} />

          <Route path="tablets" element={<TabletsCatalog />} />

          <Route path="accessories" element={<AccessoriesCatalog />} />

          <Route path="favorites" element={<Favorites />} />

          <Route path="card" element={<Cart />} />

          <Route path="#" element={<PageNotFound />} />
        </Route>

        <Route path="/sidebar" element={<Sidebar />} />
      </Routes>
    </GlobalProvider>
  </Router>,
);
