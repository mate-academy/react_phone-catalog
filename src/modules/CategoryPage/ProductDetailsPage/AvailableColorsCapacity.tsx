import classNames from 'classnames';
import styles from './ProductDetailsPage.module.scss';
import { FullProduct, ProductType } from 'models/product.model';
import { Link } from 'react-router-dom';
import apiProducts from '../../../../public/api/products.json';

const COLOR_MAP: Record<string, string> = {
  black: '#000000',
  blue: '#4f5ca8',
  coral: '#f16e4e',
  white: '#f5f5f5',
  gold: '#f5d7b2',
  silver: '#e0e0e0',
  spacegray: '#4b4b4b',
  'space gray': '#4e4d4d',
  spaceblack: '#222020',
  midnight: 'midnightblue',
  midnightgreen: 'darkgreen',
  sierrablue: '#9bb7d4',
  starlight: '#f8f3e8',
  graphite: '#575857',
  green: '#576856',
  yellow: '#f2d94e',
  purple: '#b39ddb',
  pink: '#db9dc3',
  rosegold: '#dfaaaf',
  red: '#c0392b',
};

type Props = {
  product: FullProduct;
};

const products: ProductType[] = apiProducts;

export const AvailableColors: React.FC<Props> = ({ product }) => {
  return (
    <ul className={styles.productdetailspage__info_availablecolors_list}>
      {product.colorsAvailable.map((color: string) => {
        const newProduct = products.find(
          p =>
            p.itemId ===
            `${product.namespaceId}-${product.capacity}-${color}`
              .replace(' ', '-')
              .toLowerCase(),
        );

        if (!newProduct) {
          return null;
        }

        return (
          <li
            key={color}
            className={styles.productdetailspage__info_availablecolor}
          >
            <Link
              to={`/${product.category}/product/${newProduct.id}`}
              className={classNames(
                // eslint-disable-next-line max-len
                styles.productdetailspage__info_availablecolor_colorLink,
                {
                  // eslint-disable-next-line max-len
                  [styles.productdetailspage__info_availablecolor_colorLink_active]:
                    color === product.color,
                },
              )}
              aria-label={color}
            >
              <span
                className={
                  // eslint-disable-next-line max-len
                  styles.productdetailspage__info_availablecolor_colorInner
                }
                style={{
                  backgroundColor: COLOR_MAP[color] ?? '#ccc',
                }}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export const AvailableCapacities: React.FC<Props> = ({ product }) => {
  return (
    <ul className={styles.productdetailspage__info_availablecapacities_list}>
      {product.capacityAvailable.map(capacity => {
        const newProduct = products.find(
          p =>
            p.itemId ===
            `${product.namespaceId}-${capacity}-${product.color}`
              .replace(' ', '-')
              .toLowerCase(),
        );

        if (!newProduct) {
          return null;
        }

        return (
          <li
            key={capacity}
            className={styles.productdetailspage__info_availablecapacity}
          >
            <Link
              to={`/${product.category}/product/${newProduct.id}`}
              className={classNames(
                // eslint-disable-next-line max-len
                styles.productdetailspage__info_availablecapacity_colorLink,
                {
                  // eslint-disable-next-line max-len
                  [styles.productdetailspage__info_availablecapacity_colorLink_active]:
                    capacity === product.capacity,
                },
              )}
              aria-label={capacity}
            >
              {capacity}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
