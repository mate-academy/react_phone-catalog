import { Link } from 'react-router-dom';
import classNames from 'classnames';

import styles from './Order.module.scss';
import Favourites from '../../img/icons/Favourites.svg';
import FavouritesRed from '../../img/icons/FavouritesRed.svg';

import { ProductDetail } from '../../types/ProductDetails';
import { Product } from '../../types/Product';

import { numberToCurrency } from '../../utils/numberToCurrency';
import { useToggle } from '../../hooks/useToggle';
import { useProducts } from '../../Store';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { SpecificationsProduct } from '../SpecificationsProduct';

type Props = {
  productDetail: ProductDetail;
};

export const Order: React.FC<Props> = ({ productDetail }) => {
  const {
    products,
    cartProducts,
    setCartProducts,
    favouritesProducts,
    setFavouritesProducts,
  } = useProducts();
  const currentProduct = products
    .find(prod => prod.phoneId === productDetail.id) as Product;
  const idWithoutParams = productDetail?.id.split('-').slice(0, -2).join('-');
  const colors: { [key: string]: string } = {
    black: '#212322',
    gold: '#F5D3BA',
    yellow: '#FFE88A',
    green: '#AFE3CD',
    midnightgreen: '#48524A',
    silver: '#E8E7DF',
    spacegray: '#454342',
    red: '#C71D37',
    white: '#FFFAF7',
    purple: '#D1CDDB',
    coral: '#FB624F',
    rosegold: '#EAC1BB',
    default: '#fff',
  };

  const [isSelected, toggleCart] = useToggle(
    'Cart',
    cartProducts,
    setCartProducts,
    currentProduct,
  );
  const [isFavourit, toggleFavourit] = useToggle(
    'Favourit',
    favouritesProducts,
    setFavouritesProducts,
    currentProduct,
  );

  return (
    <div className={styles.order}>
      <div className={styles.orderBlock}>
        <p className={`${styles.orderSmallTitle} smallText`}>
          Available colors
        </p>
        <ul className={styles.orderAvailableBlock}>
          {productDetail.colorsAvailable.map((color) => (
            <Link
              key={color}
              className={classNames([styles.orderColorLink], {
                [styles.orderColorLinkActive]: color === productDetail.color,
              })}
              to={`../../catalog/phones/${idWithoutParams}-${productDetail.capacity.toLocaleLowerCase()}-${color}`}
            >
              <li
                className={styles.orderColor}
                style={{ background: colors[color] || colors.default }}
              />
            </Link>
          ))}
        </ul>
      </div>
      <div className={styles.orderBlock}>
        <p className={`${styles.orderSmallTitle} smallText`}>Select capacity</p>
        <ul className={styles.orderAvailableBlock}>
          {productDetail.capacityAvailable.map((capacity) => (
            <Link
              key={capacity}
              to={`../../catalog/phones/${idWithoutParams}-${capacity.toLocaleLowerCase()}-${productDetail.color}`}
            >
              <li
                className={classNames([styles.orderCapacity], {
                  [styles.orderCapacityActive]:
                    capacity === productDetail.capacity,
                })}
              >
                {capacity}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className={styles.orderPrice}>
        <h1>
          {numberToCurrency(productDetail.priceDiscount)}
        </h1>
        <s className={styles.orderFullPrice}>
          {numberToCurrency(productDetail.priceRegular)}
        </s>
      </div>
      <div className={styles.orderBtns}>
        <Button
          text={isSelected ? 'Added to cart' : 'Add to cart'}
          className={styles.orderBtnsBtn}
          onClick={toggleCart}
          isSelected={!!isSelected}
        />
        <Icon
          icon={isFavourit ? FavouritesRed : Favourites}
          alt="Favourites"
          stylesName={styles.orderBtnsIcon}
          onClick={toggleFavourit}
        />
      </div>
      <SpecificationsProduct productDetail={productDetail} />
    </div>
  );
};
