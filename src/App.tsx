import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Aside } from './components/Aside';
import { Main } from './components/Main';
import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Products } from './components/Products';
import { Like } from './components/Like';
import { Cart } from './components/Cart';
import { ProductCard } from './components/ProductCard';
import { CartItem } from 'types/CartItem';
import { Footer } from './components/Footer';
import { NotFound } from './components/NotFoundPage';

export const App = () => {
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  const [liked, setLiked] = useState<number[]>(() => {
    const saved = localStorage.getItem('liked');

    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('liked', JSON.stringify(liked));
  }, [liked]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToLiked = (item: number) => {
    setLiked(prev =>
      prev.includes(item) ? prev.filter(id => id !== item) : [...prev, item],
    );
  };

  const handleAddToCart = (id: number, quantity: number = 1) => {
    setCart(prev => {
      const found = prev.find(item => item.id === id);
      let updatedCart;

      if (found) {
        updatedCart = prev.map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        updatedCart = [...prev, { id, quantity }];
      }

      localStorage.setItem('cart', JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  const handleIncreaseQuantity = (id: number) => {
    setCart(prev => {
      const updatedCart = prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      );

      localStorage.setItem('cart', JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCart(prev => {
      const updatedCart = prev.filter(item => item.id !== id);

      localStorage.setItem('cart', JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  const handleDecreaseQuantity = (id: number) => {
    setCart(prev => {
      const updatedCart = prev
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter(item => item.quantity > 0);

      localStorage.setItem('cart', JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  return (
    <>
      <div className="App" hidden>
        <h1>Product Catalog</h1>
        <h2>Welcome to Nice Gadgets store!</h2>
      </div>

      <div className="AppWrapper">
        {!isAsideOpen && (
          <Header setIsAsideOpen={setIsAsideOpen} liked={liked} cart={cart} />
        )}

        <main className="mainContent">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route
              path="/"
              element={
                <Main
                  handleRemoveFromCart={handleRemoveFromCart}
                  cart={cart}
                  liked={liked}
                  handleAddToCart={handleAddToCart}
                  handleAddToLiked={handleAddToLiked}
                />
              }
            />

            <Route
              path="/phones"
              element={
                <Products
                  handleRemoveFromCart={handleRemoveFromCart}
                  cart={cart}
                  liked={liked}
                  type="phones"
                  handleAddToCart={handleAddToCart}
                  handleAddToLiked={handleAddToLiked}
                />
              }
            />

            <Route
              path="/tablets"
              element={
                <Products
                  handleRemoveFromCart={handleRemoveFromCart}
                  cart={cart}
                  liked={liked}
                  type="tablets"
                  handleAddToCart={handleAddToCart}
                  handleAddToLiked={handleAddToLiked}
                />
              }
            />

            <Route
              path="/accessories"
              element={
                <Products
                  handleRemoveFromCart={handleRemoveFromCart}
                  cart={cart}
                  liked={liked}
                  type="accessories"
                  handleAddToCart={handleAddToCart}
                  handleAddToLiked={handleAddToLiked}
                />
              }
            />

            <Route
              path="/:category/:itemId"
              element={
                <ProductCard
                  handleAddToCart={handleAddToCart}
                  handleAddToLiked={handleAddToLiked}
                  liked={liked}
                  cart={cart}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              }
            />

            <Route
              path="/liked"
              element={
                <Like
                  cart={cart}
                  liked={liked}
                  handleAddToCart={handleAddToCart}
                  handleAddToLiked={handleAddToLiked}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              }
            />

            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  handleDecreaseQuantity={handleDecreaseQuantity}
                  handleIncreaseQuantity={handleIncreaseQuantity}
                  handleRemoveFromCart={handleRemoveFromCart}
                  setCart={setCart}
                />
              }
            />
          </Routes>
        </main>

        {isAsideOpen && <Aside onClose={() => setIsAsideOpen(false)} />}

        <Footer />
      </div>
    </>
  );
};
