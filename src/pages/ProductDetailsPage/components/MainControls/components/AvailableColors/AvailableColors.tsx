import { NavLink } from 'react-router-dom';
// eslint-disable-next-line max-len
import { AnyDetailedProduct } from '../../../../../../types/DetailedProductTypes';
import {
  formatUrlColor,
  generateProductPageUrl,
} from '../../../../../../utils/productUrlGenerators';
import styles from './AvailableColors.module.scss';
import classNames from 'classnames';

type Props = {
  product: AnyDetailedProduct;
};

export const AvailableColors: React.FC<Props> = ({ product }) => {
  const {
    category,
    namespaceId,
    color: currentColor,
    colorsAvailable,
    capacity: currentCapacity,
  } = product;

  return (
    <div>
      <h3 className={styles['available-colors__title']}>Available colors</h3>

      <div className={styles['available-colors__list']}>
        {colorsAvailable.map(colorOption => {
          const isActive = colorOption === currentColor;
          const url = generateProductPageUrl(
            category,
            namespaceId,
            currentCapacity, // Ємність залишається поточною
            colorOption, // Змінюється колір
          );

          return (
            <NavLink
              key={colorOption}
              to={url}
              className={classNames(styles['available-colors__item'], {
                [styles['available-colors__item--active']]: isActive,
              })}
              title={colorOption}
            >
              <div
                className={styles['available-colors__item-circle']}
                style={{ backgroundColor: formatUrlColor(colorOption) }} // Динамічний колір фону
              ></div>
            </NavLink>
          );
        })}
      </div>

      <div className={styles['available-colors__divider']}></div>
    </div>
  );
};
