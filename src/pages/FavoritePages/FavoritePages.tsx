/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { getItem } from '../../api/LocaleStorage/LocaleStorage';
import './FavoritePages.scss';
import { Product } from '../../types/Products';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { EmptyCard } from '../../components/EmptyCard/EmptyCard';
import { useSearchContext } from '../../components/Context/Context';

type Props = {
  product: Product[]
};

export const FavoritePages: React.FC<Props> = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const { defaultStateValue } = useSearchContext();

  useEffect(() => {
    const getFavoriteProduct = getItem('favorite') as Product[];

    setFavoriteProducts(getFavoriteProduct);
  }, [defaultStateValue]);

  return (
    <section className="favorite">
      <div className="container">
        <BreadCrumbs />
        <h1 className="favorite__title">Favourites</h1>
        <div className="favorite__counter">{`${favoriteProducts.length} items`}</div>

        {favoriteProducts.length ? (
          <div className="favorite__list">
            {favoriteProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyCard title="favorite" />
        )}

      </div>
    </section>
  );
};
