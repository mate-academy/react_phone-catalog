import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Order.module.scss';
import { ProductDetail } from '../../types/ProductDetails';
import { numberToCurrency } from '../../utils/numberToCurrency';

type Props = {
  currentProduct: ProductDetail;
};

export const Order: React.FC<Props> = ({ currentProduct }) => {
  const idWithoutParams = currentProduct?.id.split('-').slice(0, -2).join('-');
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

  return (
    <div className={styles.order}>
      <div className={styles.orderBlock}>
        <p className={`${styles.orderSmallTitle} smallText`}>
          Available colors
        </p>
        <ul className={styles.orderAvailableBlock}>
          {currentProduct.colorsAvailable.map((color) => (
            <Link
              key={color}
              className={classNames([styles.orderColorLink], {
                [styles.orderColorLinkActive]: color === currentProduct.color,
              })}
              to={`../../catalog/phones/${idWithoutParams}-${currentProduct.capacity}-${color}`}
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
          {currentProduct.capacityAvailable.map((capacity) => (
            <Link
              key={capacity}
              to={`../../catalog/phones/${idWithoutParams}-${capacity}-${currentProduct.color}`}
            >
              <li
                className={classNames([styles.orderCapacity], {
                  [styles.orderCapacityActive]:
                    capacity === currentProduct.capacity,
                })}
              >
                {capacity}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <h1 className="orderPrice">
        {numberToCurrency(currentProduct.priceDiscount)}
        <s className={styles.orderFullPrice}>
          {numberToCurrency(currentProduct.priceRegular)}
        </s>
      </h1>
      <div className="orderBtns">1</div>
      <div className="orderSpecifications">1</div>
    </div>
  );
};
