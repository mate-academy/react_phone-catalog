import './App.scss';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { MobileMenu } from './components/MobileMenu/MobileMenu';
import { MobilePage } from './components/MobilePage/MobilePage';
import { TabletsPage } from './components/TabletsPage/TabletsPage';
import { AccessoriesPage } from './components/AccessoriesPage/AccessoriesPage';
import { FavouritesPage } from './components/FavouritesPage/FavouritesPage';
import { useEffect, useState } from 'react';
import { CardPhone } from './cardPhone';
import { CartPage } from './components/CartPage/CartPage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { PhoneDetailPage } from './components/PhoneDetailPage/PhoneDetailPage';

export const App = () => {
  const [likeItems, setLikeItems] = useState<CardPhone[]>([]);
  const [cartItems, setCartItems] = useState<CardPhone[]>([]);
  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    setTotalItems(0);
    for (const prop in counts) {
      setTotalItems(prevToralItems => prevToralItems + counts[prop]);
    }
  }, [counts]);

  useEffect(() => {
    const savedCounts = localStorage.getItem('counts');
    const initialCounts: { [key: string]: number } = savedCounts
      ? JSON.parse(savedCounts)
      : {};

    cartItems.forEach(item => {
      initialCounts[item.id] = initialCounts[item.id] || 1;
    });

    setCounts(initialCounts);
  }, [cartItems]);

  useEffect(() => {
    const localFavourites = localStorage.getItem('favourites');

    if (localFavourites) {
      setLikeItems(JSON.parse(localFavourites));
    }
  }, [setLikeItems]);

  useEffect(() => {
    const localCart = localStorage.getItem('cart');

    if (localCart) {
      setCartItems(JSON.parse(localCart));
    }
  }, [setCartItems]);

  const addFavouritesItems = (item: CardPhone) => {
    setLikeItems(prevLikeItems => {
      let updateLikeItems;

      if (!prevLikeItems.some(phone => phone.id === item.id)) {
        updateLikeItems = [...prevLikeItems, item];
      } else {
        updateLikeItems = prevLikeItems.filter(phone => phone.id !== item.id);
      }

      localStorage.setItem('favourites', JSON.stringify(updateLikeItems));

      return updateLikeItems;
    });
  };

  const addCartItems = (item: CardPhone) => {
    setCartItems(prevCartItems => {
      let updateCartItems;

      if (!prevCartItems.some(phone => phone.id === item.id)) {
        updateCartItems = [...prevCartItems, item];
      } else {
        updateCartItems = prevCartItems.filter(phone => phone.id !== item.id);
      }

      localStorage.setItem('cart', JSON.stringify(updateCartItems));

      return updateCartItems;
    });
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path=""
            element={
              <HomePage
                likeItems={likeItems}
                addFavouritesItems={addFavouritesItems}
                addCartItems={addCartItems}
                cartItems={cartItems}
                totalItems={totalItems}
              />
            }
          ></Route>
          <Route path="/menu" element={<MobileMenu />}></Route>
          <Route
            path="/phones"
            element={
              <MobilePage
                likeItems={likeItems}
                addFavouritesItems={addFavouritesItems}
                addCartItems={addCartItems}
                cartItems={cartItems}
                totalItems={totalItems}
              />
            }
          ></Route>
          <Route
            path="/phones/:id"
            element={
              <PhoneDetailPage
                likeItems={likeItems}
                cartItems={cartItems}
                addCartItems={addCartItems}
                addFavouritesItems={addFavouritesItems}
                totalItems={totalItems}
              />
            }
          />
          <Route
            path="/tablets"
            element={
              <TabletsPage
                likeItems={likeItems}
                addFavouritesItems={addFavouritesItems}
                addCartItems={addCartItems}
                cartItems={cartItems}
                totalItems={totalItems}
              />
            }
          ></Route>
          <Route
            path="/tablets/:id"
            element={
              <PhoneDetailPage
                likeItems={likeItems}
                cartItems={cartItems}
                addCartItems={addCartItems}
                addFavouritesItems={addFavouritesItems}
                totalItems={totalItems}
              />
            }
          />
          <Route
            path="/accessories"
            element={
              <AccessoriesPage
                likeItems={likeItems}
                addFavouritesItems={addFavouritesItems}
                addCartItems={addCartItems}
                cartItems={cartItems}
                totalItems={totalItems}
              />
            }
          ></Route>
          <Route
            path="/accessories/:id"
            element={
              <PhoneDetailPage
                likeItems={likeItems}
                cartItems={cartItems}
                addCartItems={addCartItems}
                addFavouritesItems={addFavouritesItems}
                totalItems={totalItems}
              />
            }
          />
          <Route
            path="/favourites"
            element={
              <FavouritesPage
                likeItems={likeItems}
                setLikeItems={setLikeItems}
                addCartItems={addCartItems}
                cartItems={cartItems}
                totalItems={totalItems}
              />
            }
          ></Route>

          <Route
            path="/cart"
            element={
              <CartPage
                likeItems={likeItems}
                cartItems={cartItems}
                setCartItems={setCartItems}
                setCounts={setCounts}
                counts={counts}
                totalItems={totalItems}
              />
            }
          ></Route>

          <Route
            path="*"
            element={
              <NotFoundPage
                likeItems={likeItems}
                cartItems={cartItems}
                totalItems={totalItems}
              />
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};
