/* eslint-disable no-param-reassign */
import styles from './Goods.module.scss';
import { Product } from '../../../../../type/Product';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../../../shared/GlobalContext/GlobalContext';
import { useContext } from 'react';
import classNames from 'classnames';
import { useLocalStorage } from '../../../../../Hooks/useLocalStorage';

type Props = {
  product: Product;
  category: string;
};

export const Goods: React.FC<Props> = ({ product, category }) => {
  const { handlerRemoveGoods, isSunSelected, setTotalPrice } =
    useContext(GlobalContext);
  const [counterNumber, setCounterNumber] = useLocalStorage<number>(
    `items-${product.id}`,
    1,
  );

  const price = counterNumber * product.price;

  product.quantity = counterNumber;

  const handlerButtonPlus = () => {
    setCounterNumber(prev => prev + 1);
    setTotalPrice(prev => prev + product.price);
  };

  const handlerButtonMinus = () => {
    setCounterNumber(prev => prev - 1);
    setTotalPrice(prev => prev - product.price);
  };

  return (
    <>
      <div
        className={classNames(styles.good, {
          [styles.good_dark]: !isSunSelected,
        })}
      >
        <div className={styles.good__container}>
          <button
            className={classNames(styles.good__delate, {
              [styles.good__delate_dark]: !isSunSelected,
            })}
            onClick={() => handlerRemoveGoods(product.id)}
          ></button>
          <Link
            to={`/${category}/${product.itemId}`}
            className={styles.good__images}
          >
            <img src={product.image} alt="good" />
          </Link>

          <Link
            to={`/${category}/${product.itemId}`}
            className={classNames(styles.good__name, {
              [styles.good__name_dark]: !isSunSelected,
            })}
          >
            {product.name}
          </Link>
        </div>

        <div className={styles.good__counter}>
          <button
            className={classNames(styles.good__counter_minus, {
              [styles.good__counter_minus_dark]: !isSunSelected,
            })}
            disabled={counterNumber === 1}
            onClick={handlerButtonMinus}
          ></button>
          <p
            className={classNames(styles.good__counter_number, {
              [styles.good__counter_number_dark]: !isSunSelected,
            })}
          >
            {counterNumber}
          </p>
          <button
            className={classNames(styles.good__counter_plus, {
              [styles.good__counter_plus_dark]: !isSunSelected,
            })}
            onClick={handlerButtonPlus}
          ></button>

          <p
            className={classNames(styles.good__price, {
              [styles.good__price_dark]: !isSunSelected,
            })}
          >
            {`${price}$`}
          </p>
        </div>
      </div>
    </>
  );
};
