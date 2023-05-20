import { FC } from 'react';
import { Product } from '../../types/Product';
import { useAppContext } from '../../context/AppContext';
import { ResultsSearch } from '../../components/ResultsSearch';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductItem } from '../../components/ProductItem';

import './favourites.scss';

type Props = {
  products: Product[] | [];
};

export const Favourites: FC<Props> = ({
  products,
}) => {
  const { isShowResSearch, productsToSearch, favCount } = useAppContext();

  if (isShowResSearch) {
    return <ResultsSearch products={productsToSearch} />;
  }

  return (
    <div className="favourites">
      <div className="favourites__container">
        <div className="favourites__top-row">
          <Breadcrumbs />
        </div>
        <h1 className="favourites__title title">Favourites</h1>
        <p className="favourites__count">{`${favCount} items`}</p>
        {favCount === 0 ? (
          <h2 className="favourites__empty-title">
            Empty favorites list.
            <br />
            Let&apos;s fill it with things you love!
          </h2>
        ) : (
          <div className="favourites__list grid">
            {products.map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
