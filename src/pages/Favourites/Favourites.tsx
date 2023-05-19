import { FC } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductItem } from '../../components/ProductItem';
import { ResultsSearch } from '../../components/ResultsSearch/ResultsSearch';
import { useAppContext } from '../../context/AppContext';
import { Product } from '../../types/Product';
import './favourites.scss';

type Props = {
  products: Product[] | [];
};

export const Favourites: FC<Props> = ({ products }) => {
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
          <h2 className="favourites__empty-title">Favorites list is empty</h2>
        ) : (
          <div className="favourites__list grid">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
