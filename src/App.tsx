import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './styles/_colors.scss';
import { NotFound } from './components/NotFound';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { useEffect, useState } from 'react';
import { Product, Products } from './types/Product';
import { ProductPage } from './components/ProductPage';
import { ProductsContext } from './context/ProductsContext';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { Favourites } from './components/Favourites';
import { Cart } from './components/Cart';
import './i18n';
type Favorite = {
  id: string;
  active: boolean;
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const DEV_DELAY = true;

export const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [phones, setPhones] = useState<Products[]>([]);
  const [tablets, setTablets] = useState<Products[]>([]);
  const [accessories, setAccessories] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [cart, setCart] = useState<{ id: string }[]>(() => {
    try {
      const savedCart = localStorage.getItem('cart');

      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<Favorite[]>(() => {
    try {
      const savedfavorites = localStorage.getItem('favorites');

      return savedfavorites ? JSON.parse(savedfavorites) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleCart = (id: string) => {
    setCart(prev =>
      prev.some(item => item.id === id)
        ? prev.filter(item => item.id !== id)
        : [...prev, { id }],
    );
  };

  const toggleFavorite = (id: string, active: boolean) => {
    setFavorites(prev =>
      prev.some(item => item.id === id)
        ? prev.filter(item => item.id !== id)
        : [...prev, { id, active }],
    );
  };

  const deletCard = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);

      try {
        if (DEV_DELAY) {
          await delay(5000);
        }

        const res = await fetch('./api/products.json');

        if (!res.ok) {
          throw new Error('Failed to load products');
        }

        const data = await res.json();

        setProducts(data);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        if (DEV_DELAY) {
          await delay(5000);
        }

        const [phonesRes, tabletsRes, accessoriesRes] = await Promise.all([
          fetch('./api/phones.json'),
          fetch('./api/tablets.json'),
          fetch('./api/accessories.json'),
        ]);

        setPhones(await phonesRes.json());
        setTablets(await tabletsRes.json());
        setAccessories(await accessoriesRes.json());
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const [counts, setCounts] = useState<Record<string, number>>(() => {
    try {
      const savedCounts = localStorage.getItem('counts');

      return savedCounts ? JSON.parse(savedCounts) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('counts', JSON.stringify(counts));
  }, [counts]);

  const increase = (id: string) => {
    setCounts(prev => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decrease = (id: string) => {
    setCounts(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  const totalItems = cart.reduce((sum, item) => {
    return sum + (counts[item.id] || 1);
  }, 0);

  const productsMap = Object.fromEntries(
    products.map(product => [product.itemId, product]),
  );

  const total = cart.reduce((sum, item) => {
    const product = productsMap[item.id];
    const count = counts[item.id] || 1;

    return product ? sum + product.fullPrice * count : sum;
  }, 0);

  return (
    <div className="App">
      <ProductsContext.Provider
        value={{
          products,
          phones,
          tablets,
          accessories,
          isLoading,
          cart,
          favorites,
          toggleCart,
          toggleFavorite,
          deletCard,
          counts,
          totalItems,
          total,
          increase,
          decrease,

          // toggleCart,
          // toggleFavorite,
          // deletCard,
        }}
      >
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/favorites" element={<Favourites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/:category" element={<ProductPage />} />
            <Route
              path="/:category/:productId"
              element={<ProductDetailsPage />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </ProductsContext.Provider>
      <Footer />
    </div>
  );
};
