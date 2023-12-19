import './App.scss';
import { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Product } from './types/Product';
import { useLocalStorage } from './hooks/useLocalStorage';

const App = () => {
  const [favoritesItems, setFavoritesItems]
    = useLocalStorage<Product[]>('favoritesItems', []);
  const [cartItems, setCartItems] = useLocalStorage<Product[]>('cartItems', []);
  const [appliedQuery, setAppliedQuery] = useState('');

  let totalCartCount = 0;

  const totalPrice = cartItems.reduce((acc, product) => {
    totalCartCount += product.quantity || 1;
    const itemTotal = product.price * (product.quantity || 1);

    return acc + itemTotal;
  }, 0);

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );

  const addToFavorites = (product: Product) => {
    if (!favoritesItems.includes(product)) {
      setFavoritesItems([...favoritesItems, {
        ...product,
      }]);
    }
  };

  const removeFromFavorites = (productId: Product['id']) => {
    const requiredProduct
      = favoritesItems.filter((item) => item.id !== productId);

    if (requiredProduct) {
      setFavoritesItems(requiredProduct);
    }
  };

  const addToCart = (product: Product) => {
    if (!cartItems.includes(product)) {
      setCartItems([...cartItems, {
        ...product,
        quantity: 1,
      }]);
    }
  };

  const removeFromCart = (productId: Product['id']) => {
    const requiredProduct = cartItems.filter((item) => item.id !== productId);

    if (requiredProduct) {
      setCartItems(requiredProduct);
    }
  };

  const incrementQuantity = (productId: Product['id']) => {
    setCartItems(cartItems.map((item) => {
      return item.id === productId
        ? { ...item, quantity: (item.quantity || 0) + 1 } : item;
    }));
  };

  const decrementQuantity = (productId: Product['id']) => {
    setCartItems(cartItems.map((item) => {
      return item.id === productId
        ? { ...item, quantity: Math.max((item.quantity || 0) - 1, 1) }
        : item;
    }));
  };

  return (
    <div className="App">
      <Header
        applyQuery={applyQuery}
        totalCartCount={totalCartCount}
        favoritesItemsLength={favoritesItems.length}
      />
      <main className="main">
        <Outlet
          context={{
            favoritesItems,
            addToFavorites,
            removeFromFavorites,
            cartItems,
            addToCart,
            removeFromCart,
            incrementQuantity,
            decrementQuantity,
            appliedQuery,
            totalCartCount,
            totalPrice,
          }}
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;
