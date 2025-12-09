import { useMemo } from 'react';
import accessoriesFromServer from '../../public/api/products.json';

import '../components/Catalog/Catalog.scss';
import { Product } from '../types/Product';
import { Breadcrumbs } from '../components/Catalog/Breadcrumbs';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../context/ProductsContext';
import { useCartFavorite } from '../context/CartFavoriteContext';

export const FavoritesPage = () => {
  const { productsAll } = useProducts();
  const { favoriteItems } = useCartFavorite();

  const products: Product[] = useMemo(() => {
    return productsAll
      .filter(product => product.category === 'accessories')
      .splice(0, 8);
  }, []);

  return (
    <section className="catalog">
      <div className="container catalog__container">
        <Breadcrumbs />

        <h1 className="catalog__title">Favorite</h1>
        <div className="catalog__counter">95 models</div>

        <div className="catalog__wrapper">
          {products.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
