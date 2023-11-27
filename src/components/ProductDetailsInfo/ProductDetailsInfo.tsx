import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { CardButtons } from '../CardButtons/CardButtons';
import {
  getLinkToProduct,
  getMemoryCapacity,
} from '../../helpers/pagesMethods';

import './ProductDetailsInfo.scss';
import './Color.scss';
import './Capacity.scss';
import './Price.scss';
import './Specs.scss';

type Props = {
  id: string;
  colors: string[];
  currentColor: string;
  priceDiscount: number;
  priceRegular: number;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  capacities: string[];
  currentCapacity: string;
  category: string;
  nameId: string;
  images: string[];
  name: string;
};

export const ProductDetailsInfo: FC<Props> = ({
  id,
  colors,
  currentColor,
  priceDiscount,
  priceRegular,
  screen,
  resolution,
  processor,
  ram,
  capacities,
  currentCapacity,
  category,
  nameId,
  images,
  name,
}) => {
  const getColor = (color: string) => {
    switch (color) {
      case 'midnightgreen':
        return '#28372A';

      case 'rosegold':
        return '#F6D3D3';

      case 'spacegray':
        return '#717378';

      case 'gold':
        return '#F9E5C9';

      case 'green':
        return '#AEE1CD';

      case 'yellow':
        return '#FFE681';

      case 'purple':
        return '#D1CDDA';

      case 'red':
        return '#BA0C2E';

      default:
        return `${color}`;
    }
  };

  return (
    <div className="product-data">
      <div className="product-data__available-colors colors">
        <p className="colors__colors-title info-block-title">
          Available colors
        </p>

        <div className="colors__colors-icons">
          {colors.map(color => (
            <Link
              key={color}
              to={getLinkToProduct(category, nameId, currentCapacity, color)}
              className={classNames(
                'colors-icon-container',
                { 'color-active': color === currentColor },
              )}
            >
              <div className="colors__colors-icon" style={{ backgroundColor: `${getColor(color)}` }} />
            </Link>
          ))}
        </div>
      </div>

      <div className="product-data__available-capacity capacity">
        <p className="capacity__capacity-title info-block-title">
          Select capacity
        </p>

        <div className="capacity__capacity-icons">
          {capacities.map(capacity => (
            <Link
              to={getLinkToProduct(category, nameId, capacity, currentColor)}
              key={capacity}
              className={classNames(
                'capacity__capacity-icon',
                { 'capacity-active': capacity === currentCapacity },
              )}
            >
              {getMemoryCapacity(capacity)}
            </Link>
          ))}
        </div>
      </div>

      <div className="product-data__price prices">
        <div className="prices__price--with-discount">
          {`$${priceDiscount}`}
        </div>

        <div className="prices__price--full">
          {`$${priceRegular}`}
        </div>
      </div>

      <div className="product-data__buttons">
        <CardButtons
          id={id}
          product={category}
          name={name}
          price={priceDiscount}
          imageUrl={images[0]}
          fullPrice={priceRegular}
          screen={screen}
          capacity={currentCapacity}
          ram={ram}
        />
      </div>

      <div className="product-data__info-specs specs">
        <div className="specs__info-spec">
          <p className="specs__info-title">
            Screen
          </p>

          <div className="specs__info-value">
            {screen}
          </div>
        </div>

        <div className="specs__info-spec">
          <p className="specs__info-title">
            Resolution
          </p>

          <div className="specs__info-value">
            {resolution}
          </div>
        </div>

        <div className="specs__info-spec">
          <p className="specs__info-title">
            Processor
          </p>

          <div className="specs__info-value">
            {processor}
          </div>
        </div>

        <div className="specs__info-spec">
          <p className="specs__info-title">
            RAM
          </p>

          <div className="specs__info-value">
            {getMemoryCapacity(ram)}
          </div>
        </div>
      </div>
    </div>
  );
};
