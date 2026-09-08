import cn from 'classnames';

import styles from './MainControls.module.scss';
import { Actions } from '../../../../components/Actions';
import { AvailableColors } from '../AvailableColors';
import { AvailableCapacity } from '../AvailableCapacity';
import { Product, GadgetType } from '../../../../types';

interface Props {
  gadget: GadgetType;
  className?: string;
  product: Product;
}

export const MainControls: React.FC<Props> = ({
  className,
  gadget,
  product,
}) => {
  const {
    colorsAvailable,
    color,
    priceDiscount,
    priceRegular,
    screen,
    resolution,
    processor,
    ram,
    capacityAvailable,
    capacity,
  } = gadget;

  const properties = [
    { term: 'Screen', desc: screen },
    { term: 'Resolution', desc: resolution },
    { term: 'Processor', desc: processor },
    { term: 'RAM', desc: ram },
  ];

  return (
    <div className={cn(styles['main-controls'], className)}>
      <div>
        <AvailableColors
          colors={colorsAvailable}
          currentColor={color}
          className={styles['main-controls__colors']}
        />
        <AvailableCapacity
          capacity={capacityAvailable}
          activeCapacity={capacity}
          className={styles['main-controls__capacity']}
        />
        <div className={styles['main-controls__price']}>
          <p className={styles['main-controls__price-discount']}>
            {priceDiscount}$
          </p>
          <p className={styles['main-controls__price-full']}>{priceRegular}$</p>
        </div>
        <Actions
          product={product}
          className={styles['main-controls__actions']}
        />
        <ul className={styles['main-controls__prop-list']}>
          {properties.map(property => (
            <li
              key={property.term}
              className={styles['main-controls__prop-item']}
            >
              <dt className={styles['main-controls__term']}>{property.term}</dt>
              <dd className={styles['main-controls__desc']}>{property.desc}</dd>
            </li>
          ))}
        </ul>
      </div>
      <p className={styles['main-controls__id']}>ID: {product.id}</p>
    </div>
  );
};
