import classNames from 'classnames';
import React from 'react';
import { ProductDetails } from '../../../../types';

type Props = {
  productDetails: ProductDetails;
};

const productSpecsMain = [
  { title: 'Screen', specs: 'screen' },
  { title: 'Resolution', specs: 'resolution' },
  { title: 'Processor', specs: 'processor' },
  { title: 'RAM', specs: 'ram' },
];

export const ProductSpecsMain: React.FC<Props> = ({ productDetails }) => (
  <div className="product-details__specs--main">
    <ul className="product-details__specs-list">
      {productSpecsMain.map(product => (
        <li key={product.specs} className="product-details__specs-item">
          <span
            className={classNames(
              'product-details__specs-property typography__small-text',
            )}
          >
            {product.title}
          </span>
          <span className="product-details__specs-value">
            {String(productDetails[product.specs as keyof ProductDetails])}
          </span>
        </li>
      ))}
    </ul>
  </div>
);
