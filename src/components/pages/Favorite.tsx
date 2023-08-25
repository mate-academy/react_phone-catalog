/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import { Product } from '../../types/Phone';
import AsideRoute from '../AsideRoute';
import ProductCard from '../ProductCard';
import { LocaleDataTypes } from '../../utils/localeStorage';

/* eslint-disable no-console */
const Favorite = () => {
  const products = localStorage.getItem(LocaleDataTypes.FAVORITES);

  const favoriteProducts: Product[] | null = products ? Object.values(JSON.parse(products)) : null;
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (favoriteProducts) {
      setVisibleProducts([...favoriteProducts]);
    }
  }, []);

  return (
    <main className="main-catalog container">
      <AsideRoute pageTitle="Favorites" />

      <section className="section-catalog">
        <h1 className="section-catalog__title">
          Favorites
        </h1>

        <p className="section-catalog__caption">
          {`${visibleProducts?.length} items`}
        </p>

        <div className="added-items catalog">
          {visibleProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Favorite;
