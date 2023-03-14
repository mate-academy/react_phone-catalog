import { FC, useEffect, useState } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer/Footer';
import { NotFound } from './NotFound/NotFound';
import { HomePage } from './HomePage/HomePage';
import { Phones } from './Phones/Phones';
import { Tablets } from './Tablets/Tablets';
import { Accessories } from './Accessories/Accessories';
import { Cart } from './Cart/Cart';
import { Favourites } from './Favourites/Favourites';
import { ProductDetails } from './ProductDetails/ProductDetails';
import { AppProvider } from '../context/AppContext';
import { useLocaleStorage } from '../hooks/useLocaleStorage';
import { Product } from '../types/Product';
import { ProductInCart } from '../types/ProductInCart';
import { getProducts } from '../api/fetchData';
import { Pathname } from '../types/Pathname';
import './page.scss';

export const Page: FC = () => {
  const { pathname } = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [favorites, setFavorites] = useLocaleStorage('favorites', []);
  const favCount = favorites.length;
  const [inCart, setInCart] = useLocaleStorage('inCart', []);
  const inCartCount = inCart.length;

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const isShowResSearch = query.trim().length !== 0;

  const isSelectedProduct = (
    itemId: string,
    poducts: Product[] | ProductInCart[],
  ): boolean => {
    return !!poducts.find((el: Product) => el.itemId === itemId);
  };

  const loadProducts = async () => {
    setIsLoading(true);

    try {
      const productsFromServer = await getProducts();

      setProducts(productsFromServer);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

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
                element={<ProductDetails goods={products} />}
              />
            </Route>

            <Route path={Pathname.Tablets}>
              <Route
                index
                element={<Tablets products={tablets} isLoading={isLoading} />}
              />
              <Route
                path=":productId"
                element={<ProductDetails goods={products} />}
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
                element={<ProductDetails goods={products} />}
              />
            </Route>
            <Route path={Pathname.Cart} element={<Cart products={inCart} />} />

            <Route path={Pathname.Favourites}>
              <Route index element={<Favourites products={favorites} />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AppProvider>
  );
};
