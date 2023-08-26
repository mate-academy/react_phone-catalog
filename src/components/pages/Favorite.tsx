import { useState, useEffect } from 'react';
import { Product } from '../../types/Phone';
import AsideRoute from '../AsideRoute';
import ProductCard from '../ProductCard';
import { LocaleDataTypes } from '../../utils/localeStorage';

interface FavoritesProps {
  setCurrentProduct: React.Dispatch<React.SetStateAction<string>>
}

const Favorite: React.FC<FavoritesProps> = ({ setCurrentProduct }) => {
  const products = localStorage.getItem(LocaleDataTypes.FAVORITES);

  const favoriteProducts: Product[] = products
    ? Object.values(JSON.parse(products))
    : [];

  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);

  useEffect(() => {
    setCurrentProduct('favorites');

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
            <ProductCard
              key={product.id}
              product={product}
              setVisibleProducts={setVisibleProducts}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Favorite;
