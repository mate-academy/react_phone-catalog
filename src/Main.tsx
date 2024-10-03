import { App } from './App';
import { HomePage } from './components/HomePage';
import { ProductsPage } from './components/ProductsPage';
import { Favourites } from './components/Favourites';
import { Cart } from './components/Cart/Cart';
import { Route, Routes } from 'react-router-dom';
import { ItemCard } from './components/ItemCard';
import { BurgerMenu } from './components/BurgerMenu';
import productsFromServer from './api/products.json';
import { useAppContext } from './AppContext';

export const Main = () => {
  const { accessories, tablets, phones } = useAppContext();

  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route
          index
          element={
            <HomePage
              phones={phones}
              tablets={tablets}
              accessories={accessories}
            />
          }
        />
        <Route path="menu" element={<BurgerMenu />} />
        <Route path="phones">
          <Route index element={<ProductsPage product={phones} />} />
          <Route path=":productId?" element={<ItemCard swiperIndex={3} />} />
        </Route>
        <Route path="tablets">
          <Route index element={<ProductsPage product={tablets} />} />
          <Route path=":productId?" element={<ItemCard swiperIndex={4} />} />
        </Route>
        <Route path="accessories">
          <Route index element={<ProductsPage product={accessories} />} />
          <Route path=":productId?" element={<ItemCard swiperIndex={5} />} />
        </Route>
        <Route
          path="favourites"
          element={<Favourites models={productsFromServer} />}
        />
        <Route path="cart" element={<Cart models={productsFromServer} />} />
      </Route>

      <Route path="*" element={<p>Not found</p>} />
    </Routes>
  );
};
