import { ProductCard } from '../ProductCard';
import { Product } from '../types/Product';
import { PaginationBtns } from '../PaginationBtns';
import { memo } from 'react';

import './ProductCards.scss';

type Props = {
  productsOnPage: Product[];
  paginationEnabled?: boolean;
  isLoading?: boolean;
  buttonsArray?: number[];
};

// eslint-disable-next-line react/display-name
export const ProductCards: React.FC<Props> = memo(
  ({
    productsOnPage,
    paginationEnabled = false,
    isLoading = false,
    buttonsArray = [],
  }) => (
    <div className="cards">
      <div className="cards-wrapper">
        {productsOnPage.map(product => (
          <ProductCard
            isLoading={isLoading}
            key={product.id}
            product={product}
            enableDiscount={true}
          />
        ))}
      </div>
      {paginationEnabled && <PaginationBtns buttonsArray={buttonsArray} />}
    </div>
  ),
);
