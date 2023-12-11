import './App.scss';
import { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Product } from './types/Product';
import { useLocalStorage } from './hooks/useLocalStorage';

const App = () => {
  const [favoritesItems, setFavoritesItems] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useLocalStorage<Product[]>('cartItems', []);
  const [appliedQuery, setAppliedQuery] = useState('');

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );

  const addToFavorites = (product: Product) => {
    if (!favoritesItems.includes(product)) {
      setFavoritesItems((prevItems: Product[]) => [...prevItems, product]);
    }
  };

  const removeFromFavorites = (productId: Product['id']) => {
    setFavoritesItems((prevItems: Product[]) => prevItems.filter(
      (item) => item.id !== productId,
    ));
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
          }}
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;
