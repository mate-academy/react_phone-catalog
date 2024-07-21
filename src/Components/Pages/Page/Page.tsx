import { FC, useEffect, useState } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';

import '../Page.scss';

import { Order } from '../Order/Order';
import { Product } from '../../../types/Product';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { ProductInCart } from '../../../types/ProductInCart';
import { getProducts } from '../../../api/fetchData';
import { AppProvider } from '../../../context/AppContext';
import { Pathname } from '../../../types/Pathname';
import { Header } from '../../Parts/Header/Header';
import { HomePage } from '../HomePage/HomePage';
import { Phones } from '../Phones/Phones';

import Footer from '../../Parts/Footer/Footer';
import { PhonesDetails } from '../PhoneDetails/PhoneDetails';
import { Tablets } from '../Tablets/Tablets';
import { Accessories } from '../Accessories/Accessories';
import { Cart } from '../Cart/Cart';
import { NotFound } from '../NotFound/NotFound';
import { Favourites } from '../Favourites/Favourites';

export const Page: FC = () => {
  const { pathname } = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [inCart, setInCart] = useLocalStorage('inCart', []);

  const favCount = favorites.length;
  const inCartCount = inCart.reduce(
    (acc: number, el: ProductInCart) => acc + el.count,
    0,
  );
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const isShowResSearch = query.trim().length !== 0;

  const isSelectedProduct = (
    itemId: string,
    poducts: Product[] | ProductInCart[],
  ): boolean => {
    return poducts.some((el: Product) => el.itemId === itemId);
  };

  const loadProducts = async () => {
    setIsLoading(true);

    try {
      const productsFromServer = await getProducts();

      setProducts(productsFromServer);
    } catch {
      navigate('*');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleLike = (product: Product) => {
    if (isSelectedProduct(product.itemId, favorites)) {
      const newFavorites = favorites.filter(
        (fav: Product) => fav.itemId !== product.itemId,
      );

      setFavorites(newFavorites);
    } else {
      setFavorites([...favorites, product]);
    }
  };

  const handleToggleAddToCart = (product: Product | ProductInCart) => {
    const productWidthCount = { ...product, count: 1 };

    if (isSelectedProduct(productWidthCount.itemId, inCart)) {
      const newInCart = inCart.filter(
        (cart: Product) => cart.itemId !== product.itemId,
      );

      setInCart(newInCart);
    } else {
      setInCart([...inCart, productWidthCount]);
    }
  };

  const updateCount = (newCount: number, itemId: string) => {
    const newInCart = inCart.map((el: ProductInCart) => {
      if (el.itemId === itemId) {
        return { ...el, count: newCount };
      }

      return el;
    });

    setInCart(newInCart);
  };

  const phones: Product[] = products;
  const tablets: Product[] = [];
  const accessories: Product[] = [];
  const countProducts = {
    phones: phones.length,
    tablets: tablets.length,
    accessories: accessories.length,
  };

  let productsToSearch = [...products];

  switch (pathname) {
    case Pathname.Phones:
      productsToSearch = [...phones];
      break;

    case Pathname.Tablets:
      productsToSearch = [...tablets];
      break;

    case Pathname.Accessories:
      productsToSearch = [...accessories];
      break;

    case Pathname.Favourites:
      productsToSearch = [...favorites];
      break;

    default:
      productsToSearch = [...products];
      break;
  }

  if (query.trim()) {
    productsToSearch = productsToSearch.filter((product: Product) => {
      return product.name.toLowerCase().includes(query.trim().toLowerCase());
    });
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <AppProvider
      value={{
        favorites,
        favCount,
        handleToggleLike,
        inCart,
        inCartCount,
        handleToggleAddToCart,
        isSelectedProduct,
        query,
        isShowResSearch,
        productsToSearch,
        updateCount,
      }}
    >
      <div className="page">
        <Header />

        <div className="page__content">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage products={products} countProducts={countProducts} />
              }
            />
            <Route path={Pathname.Home} element={<Navigate to="/" replace />} />
            <Route path={Pathname.Phones}>
              <Route
                index
                element={<Phones products={phones} isLoading={isLoading} />}
              />
              <Route
                path=":productId"
                element={<PhonesDetails goods={products} />}
              />
            </Route>

            <Route path={Pathname.Tablets}>
              <Route
                index
                element={<Tablets products={tablets} isLoading={isLoading} />}
              />
              <Route
                path=":productId"
                element={<PhonesDetails goods={products} />}
              />
            </Route>

            <Route path={Pathname.Accessories}>
              <Route
                index
                element={
                  <Accessories products={accessories} isLoading={isLoading} />
                }
              />
              <Route
                path=":productId"
                element={<PhonesDetails goods={products} />}
              />
            </Route>

            <Route path={Pathname.Cart}>
              <Route index element={<Cart products={inCart} />} />
              <Route path="order" element={<Order products={inCart} />} />
            </Route>

            <Route path={Pathname.Favourites}>
              <Route index element={<Favourites products={favorites} />} />
            </Route>

            <Route path="*" element={<NotFound title={'Go Home'} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AppProvider>
  );
};
