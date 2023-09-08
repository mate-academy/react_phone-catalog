import { useEffect } from 'react';
import AsideRoute from '../Blocks/AsideRoute';
import ProductCard from '../Blocks/ProductCard';
import GoBackLink from '../Blocks/GoBackLink';

import { useProductsContext } from '../../utils/ProductsContext';

interface FavoritesProps {
  setCurrentProduct: React.Dispatch<React.SetStateAction<string>>
}

const Favorite: React.FC<FavoritesProps> = ({ setCurrentProduct }) => {
  const { favoriteProducts } = useProductsContext();

  useEffect(() => {
    setCurrentProduct('favorites');
  }, []);

  return (
    <main className="main-catalog container">
      <AsideRoute pageTitle="Favorites" />

      <GoBackLink />

      <section className="section-catalog">
        <h1 className="section-catalog__title">
          Favorites
        </h1>

        <p className="section-catalog__caption">
          {`${favoriteProducts?.length} items`}
        </p>

        <div className="added-items catalog">
          {favoriteProducts?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Favorite;
