import { FC } from 'react';
import { Product } from '../../../types/Product';
import { useAppContext } from '../../../context/AppContext';
import { Breadcrumbs } from '../../Parts/Breadcrumbs/Breadcrumbs';
import { ProductItem } from '../../Parts/ProductItem/ProductItem';

import './Favorites.scss';

type Props = {
  products: Product[] | [];
};

export const Favourites: FC<Props> = ({ products }) => {
  const { isShowResSearch, productsToSearch, favCount } = useAppContext();

  return (
    <div className="favourites">
      <div className="favourites__container">
        <div className="favourites__top-row">
          <Breadcrumbs />
        </div>
        <h1 className="favourites__title title">Favourites</h1>
        <p className="favourites__count">{`${favCount} items`}</p>
        {isShowResSearch ? (
          <div className="results-search__container">
            <p className="results-search__count">{`${productsToSearch.length} results`}</p>

            {productsToSearch.length !== 0 ? (
              <div className="product-list__content grid">
                {productsToSearch.map(product => (
                  <ProductItem product={product} key={product.id} />
                ))}
              </div>
            ) : (
              <p className="results-search__not-found">
                Nothing was found for your request
              </p>
            )}
          </div>
        ) : (
          <div>
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
        )}
      </div>
    </div>
  );
};
