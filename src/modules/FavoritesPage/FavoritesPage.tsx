import { FC, useEffect, useState } from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { ProductCard } from '../shared/components/ProductCard';
import { getAllProducts, Product } from '../../services/api';
import style from './FavoritesPage.module.scss';
import { Container } from '../../components/Container';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { HomeIcon } from '../../components/HomeIcon';

interface FavoritesPageState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export const FavoritesPage: FC = () => {
  const { favourites } = useFavorites();

  const [state, setState] = useState<FavoritesPageState>({
    products: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await getAllProducts();

        setState({
          products: allProducts,
          loading: false,
          error: null,
        });
      } catch (err) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load products',
        }));
      }
    };

    fetchData();
  }, []);

  const favoriteProducts = state.products.filter(p =>
    favourites.includes(p.itemId),
  );

  if (state.loading) {
    return (
      <main className={style.favoritesPage}>
        <Container>
          <h1>Favorites</h1>
          <p>Loading...</p>
        </Container>
      </main>
    );
  }

  if (state.error) {
    return (
      <main className={style.favoritesPage}>
        <Container>
          <h1>Favorites</h1>
          <div className={style.error}>{state.error}</div>
        </Container>
      </main>
    );
  }

  if (!favoriteProducts.length) {
    return (
      <main className={style.favoritesPage}>
        <Container>
          <h1>Favorites</h1>
          <div className={style.empty}>
            <h2>Your favorites list is empty</h2>
            <p>Add items to your favorites by clicking the heart icon</p>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className={style.favoritesPage}>
      <Container>
        <Breadcrumbs
          items={[{ link: '/', icon: <HomeIcon /> }, { label: 'Favourites' }]}
        />
        <h1>Favourites</h1>
        <p className={style.count}>
          {favoriteProducts.length} item
          {favoriteProducts.length !== 1 ? 's' : ''}
        </p>

        <div className={style.grid}>
          {favoriteProducts.map(product => (
            <div key={product.id} className={style.slideItem}>
              <ProductCard
                key={product.itemId}
                className={style.favoriteCard}
                product={{
                  id: product.itemId,
                  itemId: product.itemId,
                  name: product.name,
                  price: product.price,
                  discount: product.fullPrice - product.price,
                  image: product.image,
                  rating: 4.5 + Math.random() * 0.5,
                  reviewCount: Math.floor(Math.random() * 200) + 50,
                  isFavorite: true,
                  screen: product.screen,
                  capacity: product.capacity,
                  ram: product.ram,
                  category: product.category,
                }}
              />
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
};
