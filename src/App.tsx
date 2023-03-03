/* eslint-disable max-len */
import { FC, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getAllProducts } from './api/api';
import 'bulma';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/main.scss';

import { Home } from './components/Home';
import { Product } from './types/Product';
import { ProductsList } from './components/ProductsList';
import { PageNotFound } from './components/PageNotFound';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { CartPage } from './components/CartPage';
import { FavoritesPage } from './components/FavoritePage';
import { CartProduct } from './types/CartProduct';
import { Context } from './contexts/Context';

const App: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isloading, setIsLoading] = useState(false);
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [fav, setFav] = useState<Product[]>([]);
  const [isTick, setIsTick] = useState(false);

  const toggleCart = (product: Product) => {
    if (cart.find((cartList: CartProduct) => (
      cartList.item.id === product.id))) {
      setCart(cart.filter((cartList: CartProduct) => (cartList.item.id !== product.id)));
      window.localStorage.setItem('cart', JSON.stringify(cart));
      setIsTick(!isTick);
    } else {
      cart.push({ count: 1, item: { ...product } });
      window.localStorage.setItem('cart', JSON.stringify(cart));
      setIsTick(!isTick);
    }
  };

  const toggleFav = (product: Product) => {
    if (fav.find((favList: Product) => (
      favList.id === product.id))) {
      setFav(fav.filter((favList: Product) => (favList.id !== product.id)));
      window.localStorage.setItem('favourite', JSON.stringify(fav));
      setIsTick(!isTick);
    } else {
      fav.push(product);
      window.localStorage.setItem('favourite', JSON.stringify(fav));
      setIsTick(!isTick);
    }
  };

  useEffect(() => {
    const cartStorage = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart') || '')
      : [];

    setCart(cartStorage);
  }, []);

  useEffect(() => {
    const favStorage = localStorage.getItem('favourite')
      ? JSON.parse(localStorage.getItem('favourite') || '')
      : [];

    setFav(favStorage);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('favourite', JSON.stringify(fav));
  }, [fav]);

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const totalCount = () => {
    return cart.reduce((prev, current) => (
      prev + +current.count
    ), 0);
  };

  const totalPrice = () => {
    return cart.reduce((prev, current) => (
      prev + ((current.item.price - ((current.item.price / 100) * current.item.discount)) * +current.count)
    ), 0);
  };

  const updateCount = (id: string, countNum: number) => {
    setCart(cart.map((cartItem: CartProduct) => {
      if (id === cartItem.item.id) {
        return ({
          ...cartItem,
          count: countNum,
        });
      }

      return cartItem;
    }));
  };

  const deleteItem = (id: string) => {
    setCart(cart.filter((cartItem) => cartItem.item.id !== id));
  };

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await getAllProducts();

      setProducts(data);
    } catch {
      Promise.reject(new Error('error'));
    } finally {
      setIsLoading(false);
    }
  };

  const phonesList = products.filter(product => product.type === 'phone');
  const tabletList = products.filter(product => product.type === 'tablet');
  const accessoriesList = products.filter(product => product.type === 'accessories');

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Context.Provider value={{
      cart,
      fav,
      setFav,
      toggleCart,
      toggleFav,
      setCart,
      totalCount,
      totalPrice,
      updateCount,
      deleteItem,
    }}
    >
      <Routes>
        <Route path="/" element={<Home products={products} />}>
          <Route path="/home" element={<Navigate to="/" />} />
        </Route>
        <Route path="/phones" element={<ProductsList products={phonesList} isloading={isloading} title="Mobile phones" />} />
        <Route path="/phones/:productId" element={<ProductDetailsPage products={phonesList} />} />
        <Route path="/tablets" element={<ProductsList products={tabletList} isloading={isloading} title="Tablets" />} />
        <Route path="/tablets/:productId" element={<ProductDetailsPage products={tabletList} />} />
        <Route path="/accessories" element={<ProductsList products={accessoriesList} isloading={isloading} title="Accessories" />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Context.Provider>
  );
};

export default App;
