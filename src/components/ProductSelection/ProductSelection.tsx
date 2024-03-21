import React, { memo, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { ProductsContext } from '../../store/ProductsContext';

import './ProductSelection.scss';

type Props = {
  selectedColor: string;
  colorsAvailable: string[];
  selectedCapacity: string;
  capacityAvailable: string[];
  productId: string;
};

export const ProductSelection: React.FC<Props> = memo(
  ({
    colorsAvailable,
    capacityAvailable,
    selectedColor,
    selectedCapacity,
    productId,
  }) => {
    const { products } = useContext(ProductsContext);
    const productCategory = useMemo(
      () => products.find(product => product.itemId === productId)?.category,
      [products, productId],
    );

    const getProductLinkByColor = (color: string, originalId: string) => {
      const newId = [...originalId.split('-').slice(0, -1), color].join('-');

      return `/${productCategory}/:${newId}`;
    };

    const getProductLinkByCapacity = (capacity: string, originalId: string) => {
      const normalizedCapacity = capacity.toLowerCase();
      const originalColor = originalId.split('-').pop();

      const newId = [
        ...originalId.split('-').slice(0, -2),
        normalizedCapacity,
        originalColor,
      ].join('-');

      return `/${productCategory}/:${newId}`;
    };

    return (
      <section className="ProductSelection ProductDetails__selection">
        <article className="ProductSelection__block">
          <p className="ProductSelection__subhead">Available colors</p>

          <div className="ProductSelection__optionsBlock">
            {colorsAvailable.map(color => (
              <Link
                to={getProductLinkByColor(color, productId)}
                key={color}
                type="button"
                aria-label={`Select color - ${color}`}
                className={classNames('ProductSelection__colorSelect', {
                  'ProductSelection__colorSelect--active':
                    color === selectedColor,
                })}
              >
                <div
                  className={`ProductSelection__color ProductSelection__color--${color}`}
                />
              </Link>
            ))}
          </div>
        </article>

        <hr className="ProductSelection__divider" />

        <article className="ProductSelection__block">
          <p className="ProductSelection__subhead">Select capacity</p>

          <div className="ProductSelection__optionsBlock">
            {capacityAvailable.map(capacity => (
              <Link
                to={getProductLinkByCapacity(capacity, productId)}
                key={capacity}
                type="button"
                aria-label={`Select capacity - ${capacity}`}
                className={classNames('ProductSelection__capacitySelect', {
                  'ProductSelection__capacitySelect--active':
                    capacity === selectedCapacity,
                })}
              >
                {capacity}
              </Link>
            ))}
          </div>
        </article>

        <hr className="ProductSelection__divider" />
      </section>
    );
  },
);
