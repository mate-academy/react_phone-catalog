import React from 'react';
import classNames from 'classnames';
import { Phone } from '../../types/Phone';
import { Tablet } from '../../types/Tablet';
import { Accessory } from '../../types/Accessory';
import { Link } from 'react-router-dom';

type Props = {
  currentProduct: Phone | Tablet | Accessory | undefined;
  parametr: string;
};

export const ProductParametrBox: React.FC<Props> = ({
  currentProduct,
  parametr,
}) => {
  if (!currentProduct) {
    return null;
  }

  let values;

  const currentLink = (value: string) => {
    let result = `/${currentProduct.category}/${currentProduct.namespaceId}-`;

    if (!!+value.slice(0, 1)) {
      result =
        result +
        `${value.toLowerCase()}-${currentProduct.color.toLowerCase().replace(/ /g, '-')}`;
    } else {
      result =
        result +
        `${currentProduct.capacity.toLowerCase()}-${value.toLowerCase().replace(/ /g, '-')}`;
    }

    return result;
  };

  switch (parametr) {
    case 'color':
      values = currentProduct.colorsAvailable;
      break;
    case 'capacity':
      values = currentProduct.capacityAvailable;
      break;
    default:
      return;
  }

  return (
    <div
      className={`product-parametr-box product__parametr-box product__parametr-box--${parametr}`}
    >
      {values.map((value, index) => (
        <Link
          key={index}
          to={currentLink(value)}
          className={classNames(
            `product-parametr-box__link product-parametr-box__link-${parametr} product-parametr-box__link-${parametr}--${value}`,
            {
              _active:
                currentProduct[parametr as keyof typeof currentProduct] ===
                value,
            },
          )}
        >
          {parametr !== 'color' && value}
        </Link>
      ))}
    </div>
  );
};
