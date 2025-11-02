import classNames from 'classnames';
import { Product } from '../../../types/data';
import styles from './ProductItem.module.scss';
import { Link } from 'react-router-dom';
import { AddButton } from '../../../components/AddButton/AddButton';
import { Fav } from '../../../components/Icons/Favourite/Fav';

type Props = {
  item: Product;
  discount: boolean;
};

export const ProductItem: React.FC<Props> = ({ item, discount }) => {
  const path = `/${item.category}/${item.itemId}`;

  return (
    <article className={classNames(styles.item)}>
      <Link to={path} className={classNames(styles.item__content)}>
        <img
          src={`${import.meta.env.BASE_URL}/${item.image}`}
          alt="product"
          className={classNames(styles.item__img)}
        />
        <div className={classNames(styles.item__name)}>{item.name}</div>
        {discount && (
          <div className={classNames(styles.item__price)}>
            <span
              className={classNames(styles['item__price-current'])}
            >{`$${item.price}`}</span>
            <span
              className={classNames(styles['item__price-full'])}
            >{`$${item.fullPrice}`}</span>
          </div>
        )}
        {!discount && (
          <div className={classNames(styles.item__price)}>
            <span
              className={classNames(styles['item__price-current'])}
            >{`$${item.fullPrice}`}</span>
          </div>
        )}
        <div className={classNames(styles.item__specs)}>
          <div className={classNames(styles.item__spec)}>
            <div className={classNames(styles['item__spec--title'])}>
              Screen
            </div>
            <div className={classNames(styles['item__spec--value'])}>
              {item.screen}
            </div>
          </div>
          <div className={classNames(styles.item__spec)}>
            <div className={classNames(styles['item__spec--title'])}>
              Capacity
            </div>
            <div className={classNames(styles['item__spec--value'])}>
              {item.capacity.slice(0, -2)} {item.capacity.slice(-2)}
            </div>
          </div>
          <div className={classNames(styles.item__spec)}>
            <div className={classNames(styles['item__spec--title'])}>RAM</div>
            <div className={classNames(styles['item__spec--value'])}>
              {item.ram.slice(0, -2)} {item.ram.slice(-2)}
            </div>
          </div>
        </div>
      </Link>
      <div className={classNames(styles.item__buttons)}>
        <AddButton id={item.id} />
        <Fav id={item.id} />
      </div>
    </article>
  );
};
