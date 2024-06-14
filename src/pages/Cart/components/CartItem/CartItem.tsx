import { useState } from 'react';
import { ProductGeneral } from '../../../../types/ProductGeneral';
import styles from './CartItem.module.scss';

type Props = {
  item: ProductGeneral;
  updateCount: (v: number) => void;
  handleDelete: (v: string) => void;
};

export const CartItem: React.FC<Props> = ({
  item,
  updateCount,
  handleDelete,
}) => {
  const { image, name, price } = item;
  const [count, setCount] = useState(1);
  const onDelete = () => {
    handleDelete(item.itemId);
  };

  return (
    <article className={`${styles.container} border`}>
      <div className="icon icon--close" onClick={onDelete}></div>
      <img className={`${styles.img} hover--scale`} src={image} alt={name} />
      <p className={`${styles.name}`}>{name}</p>
      <div className={`${styles.bottom}`}>
        <div className={`${styles.buttons}`}>
          <button
            className="button button--small"
            disabled={count === 1}
            onClick={() => {
              setCount(prevCount => prevCount - 1);
              updateCount(count - 1);
            }}
          >
            <div className="icon icon--minus"></div>
          </button>
          <div className={`${styles.count} button--small`}>{count}</div>
          <button
            className="button button--small"
            onClick={() => {
              setCount(prevCount => prevCount + 1);
              updateCount(count + 1);
            }}
          >
            <div className="icon icon--plus"></div>
          </button>
        </div>
        <div className={`${styles.price}`}>{`$ ${price}`}</div>
      </div>
    </article>
  );
};
