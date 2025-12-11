import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { Phones } from './components/Phones/Phones';
import { Main } from './components/Main/Main';
import { Aside } from './components/Aside/Aside';
import { DevicesProvider } from './DevicesContext';
import { Tablets } from './components/Tablets/Tablets';
import { Accessories } from './components/Accessories/Accessories';
import { ItemCard } from './components/ItemCard/ItemCard';
import { Favourites } from './components/Favourites/Favourites';
import { Cart } from './components/Cart/Cart';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

export const Root = () => (
  <DevicesProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Main />}></Route>

          <Route path="aside" element={<Aside />}></Route>

          <Route path="phones" element={<Phones />}>
            <Route path=":Id" element={<ItemCard />} />
          </Route>

          <Route path="tablets" element={<Tablets />}>
            <Route path=":Id" element={<ItemCard />} />
          </Route>

          <Route path="accessories" element={<Accessories />}>
            <Route path=":Id" element={<ItemCard />} />
          </Route>

          <Route path="favourites" element={<Favourites />} />

          <Route path="cart" element={<Cart />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </DevicesProvider>
);
