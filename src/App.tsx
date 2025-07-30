import { useEffect, useState } from 'react';
import './App.scss';
import { NavBar } from './components/NavBar';
import { Products } from './types/Products';
import { Phones } from './types/Phones';
import { Tablets } from './types/Tablets';
import { Accessories } from './types/Accessories';
import { Footer } from './components/Footer';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { ProductsContext } from './context/ProductContext';
import { Catalog } from './components/Catalog';
import { Favorites } from './components/Favorites';
import { getLikes, handleLike } from './utils/like';
import { Cart } from './components/Cart';
import {
  addToCart,
  changeCounter,
  clearCart,
  deleteFromCart,
  getProductsFromCart,
} from './utils/cart';
import { ProductDetails } from './components/ProductDetails';
import { NoFoundPage } from './components/NoFoundPage';

export const App = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [phones, setPhones] = useState<Phones[]>([]);
  const [tablets, setTablets] = useState<Tablets[]>([]);
  const [accessories, setAccessories] = useState<Accessories[]>([]);
  const [favoritesProducts, setFavoritesProducts] = useState(getLikes());
  const [addedCartProducts, setAddedCartProduct] = useState(
    getProductsFromCart(),
  );

  function onToggleLike(id: string) {
    handleLike(id);
    setFavoritesProducts(getLikes());
  }

  function onAddProduct(id: string) {
    addToCart(id);
    setAddedCartProduct(getProductsFromCart());
  }

  function onDeleteProduct(id: string) {
    deleteFromCart(id);
    setAddedCartProduct(getProductsFromCart());
  }

  function onChangeCounter(action: string, id: string) {
    changeCounter(action, id);
    setAddedCartProduct(getProductsFromCart());
  }

  function onClearCart() {
    clearCart();
    setAddedCartProduct(getProductsFromCart());
  }

  useEffect(() => {
    fetch('api/products.json')
      .then(res => res.json())
      .then(setProducts)
      .catch(() => {})
      .finally(() => {});
  }, []);

  useEffect(() => {
    fetch('api/phones.json')
      .then(res => res.json())
      .then(setPhones);
  }, []);

  useEffect(() => {
    fetch('api/tablets.json')
      .then(res => res.json())
      .then(setTablets);
  }, []);

  useEffect(() => {
    fetch('api/accessories.json')
      .then(res => res.json())
      .then(setAccessories);
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        phones,
        tablets,
        accessories,
        favoritesProducts,
        addedCartProducts,
        onAddProduct,
        onDeleteProduct,
        onChangeCounter,
        onClearCart,
        onToggleLike,
      }}
    >
      <div className="App">
        <NavBar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/:category">
            <Route index element={<Catalog />} />
            <Route path=":productId" element={<ProductDetails />} />
          </Route>
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NoFoundPage />} />
        </Routes>

        <Footer />
      </div>
    </ProductsContext.Provider>
  );
};
