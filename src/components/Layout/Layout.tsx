import {
  Suspense,
  useEffect,
  useState,
  useCallback,
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
import { breadAvailableIn } from './constants';
import Menu from '../Menu/Menu';
import { MenuContext } from '../../contexts/MenuContext';

const Layout = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [tablets] = useState<Product[]>([]);
  const [accessories] = useState<Product[]>([]);
  const [isMenu, setIsMenu] = useState(false);
  const location = useLocation().pathname;
  const isSearchAvailable = !breadAvailableIn.includes(location);
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

  const setFavorite = useCallback((product: Product) => {
    const newSaveProduct = {
      product: { ...product },
      count: 1,
      id: product.id,
    };

    setFavorites((currStores: Store[]) => (
      [...currStores, newSaveProduct]
    ));
  }, [favorites]);

  const delFavorite = useCallback((cardName: string) => {
    setFavorites((currStores: Store[]) => currStores
      .filter(currStore => currStore.product.name !== cardName));
  }, [favorites]);

  const addCard = useCallback((product: Product) => {
    const newSaveProduct = {
      product: { ...product },
      count: 1,
      id: product.id,
    };

    setCart((currStores: Store[]) => ([...currStores, newSaveProduct]));
  }, [cart]);

  const delCard = useCallback((cardName: string) => {
    setCart((currStores: Store[]) => currStores
      .filter(currStore => currStore.product.name !== cardName));
  }, []);

  const changeCardCount = useCallback((id: number, newCount: number) => {
    setCart((currStores: Store[]) => {
      return currStores.map(currStore => {
        if (currStore.id === id) {
          return { ...currStore, count: currStore.count + newCount };
        }

        return currStore;
      });
    });
  }, [cart]);

  const toggleMenu = () => {
    setIsMenu(currIsMenu => !currIsMenu);
  };

  useEffect(() => {
    if (isMenu) {
      setIsMenu(false);
    }
  }, [location]);

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
        <MenuContext.Provider value={{ toggleMenu }}>
          <Header />
        </MenuContext.Provider>

        <MenuContext.Provider value={{ isMenu }}>
          <Menu />
        </MenuContext.Provider>

        <Suspense fallback={<Loader />}>
          {isSearchAvailable && (
            <BreadCrumbs />
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
