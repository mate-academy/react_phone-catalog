import { useState, useEffect } from 'react';
import { Product } from '../../types/Product';
import { ProductList } from '../../components/ProductList';
import { Spinner } from '../../components/Spinner';

export const FavoritesPage: React.FC = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const FAVORITES_KEY = 'favorites';
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  const loadFavorites = async () => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    const favoriteIds: string[] = stored ? JSON.parse(stored) : [];
    const categories = ['phones', 'tablets', 'accessories'];
    const allProducts: Product[] = [];

    setLoading(true);
    setErr(false);

    for (const category of categories) {
      try {
        const response = await fetch(
          `/react_phone-catalog/api/${category}.json`,
        );

        if (response.ok) {
          const products: Product[] = await response.json();

          const productsWithCategory = products.map(product => ({
            ...product,
            category,
          }));

          allProducts.push(...productsWithCategory);
        } else {
          throw new Error('Bad response');
        }
      } catch (error) {
        console.error(`Failed to fetch ${category}:`, error);
        setErr(true);
      }
    }

    const matchedProducts = allProducts.filter(product =>
      favoriteIds.includes(product.id),
    );

    setFavoriteProducts(matchedProducts);
    setLoading(false);
  };

  useEffect(() => {
    loadFavorites();

    const handleFavoritesUpdated = () => {
      loadFavorites();
    };

    window.addEventListener('favoritesUpdated', handleFavoritesUpdated);

    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdated);
    };
  }, []);

  return (
    <>
      {loading && <Spinner />}

      {favoriteProducts.length > 0 && !loading && !err && (
        <section className="favorites">
          <div className="container">
            <div className="favorites_wrapper">
              <h1 className="favorites_title">Favourites</h1>
              <p className="favorites_count">
                {favoriteProducts.length === 1
                  ? `${favoriteProducts.length} item`
                  : `${favoriteProducts.length} items`}
              </p>
            </div>
          </div>

          <ProductList products={favoriteProducts} />
        </section>
      )}

      {favoriteProducts.length === 0 && !loading && !err && (
        <div className="err">
          <h1 className="err_text">No favorite products yet</h1>
        </div>
      )}

      {err && !loading && (
        <div className="err">
          <h1 className="err_text">Failed to load favorites</h1>
        </div>
      )}
    </>
  );
};
