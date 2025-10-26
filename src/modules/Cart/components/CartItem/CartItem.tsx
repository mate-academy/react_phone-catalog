import classNames from 'classnames';
import { Icon } from '../../../../components/Icon';
import { Product } from '../../../../types/data';
import styles from './CartItem.module.scss';

type Props = {
  item: Product;
  count: number;
  onPlus: (id: number) => void;
  onMinus: (id: number) => void;
  onRemove: (id: number) => void;
};

export const CartItem: React.FC<Props> = ({
  item,
  count,
  onPlus,
  onMinus,
  onRemove,
}) => {
  return (
    <article className={classNames(styles.item)}>
      <div className={classNames(styles.item__content)}>
        <button
          className={classNames(styles.item__remove)}
          onClick={() => {
            onRemove(item.id);
          }}
        >
          <Icon
            path={`${import.meta.env.BASE_URL}/img/icons/exit.svg`}
            name="remove"
          />
        </button>
        <div className={classNames(styles.item__inform)}>
          <img
            className={classNames(styles.item__img)}
            src={`/${item.image}`}
            alt={`${item.name}-img`}
          />
          <span className={classNames(styles.item__name)}>{item.name}</span>
        </div>
        <div className={classNames(styles.item__count)}>
          <button
            className={classNames(
              styles['item__count--min'],
              styles['item__count-button'],
            )}
            onClick={() => {
              onMinus(item.id);
            }}
          >
            <Icon
              path={`${import.meta.env.BASE_URL}/img/icons/minus.svg`}
              name="mines"
            />
          </button>
          <div className={classNames(styles['item__count--amount'])}>
            {count}
          </div>
          <button
            className={classNames(
              styles['item__count--plus'],
              styles['item__count-button'],
            )}
            onClick={() => {
              onPlus(item.id);
            }}
          >
            <Icon
              path={`${import.meta.env.BASE_URL}/img/icons/plus.svg`}
              name="plus"
            />
          </button>
        </div>
        <div className={classNames(styles.item__price)}>
          ${item.price * count}
        </div>
      </div>
    </article>
  );
};
