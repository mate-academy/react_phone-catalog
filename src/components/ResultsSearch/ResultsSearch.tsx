import { FC } from 'react';
import { Product } from '../../types/Product';
import { ProductItem } from '../ProductItem';
import './results-search.scss';

type Props = {
  products: Product[];
};

export const ResultsSearch: FC<Props> = ({ products }) => {
  const countProducts = products.length;

  return (
    <div className="results-search">
      <div className="results-search__container">
        <p className="results-search__count">{`${countProducts} results`}</p>
        {countProducts !== 0 ? (
          <div className="results-search__found grid">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="results-search__not-found">
            Nothing was found for your request
          </p>
        )}
      </div>
    </div>
  );
};
