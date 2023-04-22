import {
  Suspense,
  useEffect,
  useState,
} from 'react';
import './Layout.scss';
import { Outlet, useLocation } from 'react-router';

import { Product } from '../../types/Product';
import { getProducts } from '../../api/api';
import { useLocaleStorage } from '../../hooks/useLocaleStorage';

import { ProductsContext } from '../../contexts/ProductsContext';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import { CartContext } from '../../contexts/CartContext';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import Loader from '../Loader/Loader';
import { Store } from '../../types/Store';
// import Menu from '../Menu/Menu';

const breadAvailableIn = [
  '/phones',
  '/tablets',
  '/accessories',
  '/favorites',
  '/cart',
];

const Layout = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [tablets] = useState<Product[]>([]);
  const [accessories] = useState<Product[]>([]);
  const location = useLocation();
  const isSearchAvailable = breadAvailableIn.includes(location.pathname);
  const path = location.pathname.slice(1).split(' ');
  const [favorites, setFavorites] = useLocaleStorage<Store[]>(
    [],
    'favorites',
  );
  const [cart, setCart] = useLocaleStorage<Store[]>(
    [],
    'cart',
  );

  useEffect(() => {
    getProducts()
      .then(res => setPhones(res));
  }, []);

  const setFavorite = (product: Product) => {
    const newSaveProduct = {
      product: { ...product },
      count: 1,
      id: product.id,
    };

    setFavorites((currStores: Store[]) => (
      [...currStores, newSaveProduct]
    ));
  };

  const delFavorite = (cardName: string) => {
    setFavorites((currStores: Store[]) => currStores
      .filter(currStore => currStore.product.name !== cardName));
  };

  const addCard = (product: Product) => {
    const newSaveProduct = {
      product: { ...product },
      count: 1,
      id: product.id,
    };

    setCart((currStores: Store[]) => ([...currStores, newSaveProduct]));
  };

  const changeCardCount = (id: number, newCount: number) => {
    setCart((currStores: Store[]) => {
      return currStores.map(currStore => {
        if (currStore.id === id) {
          return { ...currStore, count: currStore.count + newCount };
        }

        return currStore;
      });
    });
  };

  const delCard = (cardName: string) => {
    setCart((currStores: Store[]) => currStores
      .filter(currStore => currStore.product.name !== cardName));
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      setFavorite,
      delFavorite,
    }}
    >
      <CartContext.Provider value={{
        cart,
        addCard,
        delCard,
        changeCardCount,
      }}
      >
        <Header />
        <Suspense fallback={<Loader />}>
          {/* <Menu /> */}
          {isSearchAvailable && (
            <BreadCrumbs path={path} />
          )}
          <main>
            <ProductsContext.Provider value={{
              phones,
              tablets,
              accessories,
            }}
            >
              <Outlet />
            </ProductsContext.Provider>
          </main>
          <Footer />
        </Suspense>
      </CartContext.Provider>
    </FavoritesContext.Provider>
  );
};

export default Layout;
