import classNames from 'classnames';
import React from 'react';
import { ProductDetails } from '../../../../types';

type Props = {
  productDetails: ProductDetails;
};

export const ProductAbout: React.FC<Props> = ({ productDetails }) => (
  <div className="product-details__about">
    <h3 className="product-details__about-title typography__h3">About</h3>
    <div className="product-details__about-description">
      <ul className="product-details__about-list">
        {productDetails.description.map(item => (
          <li key={item.title} className="product-details__about-item">
            <h4
              className={classNames(
                'product-details__about-item-title typography__h4',
              )}
            >
              {item.title}
            </h4>
            <p
              className={classNames(
                'product-details__about-item-content typography__body',
              )}
            >
              {item.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
