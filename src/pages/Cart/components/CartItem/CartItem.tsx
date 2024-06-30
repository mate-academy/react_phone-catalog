import { useContext, useState } from 'react';
import { ProductGeneral } from '../../../../types/ProductGeneral';
import styles from './CartItem.module.scss';
import { getButtonSecondaryClass } from '../../../../utils/utils';
import { ProductContext } from '../../../../store/ProductContext';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

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
  const { image, name, price, category, itemId } = item;
  const { darkTheme } = useContext(ProductContext);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const onDelete = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    handleDelete(item.itemId);
  };

  return (
    <article
      className={`${styles.container} border`}
      onClick={() => {
        navigate(`/${category}/${itemId}`);
        window.scrollTo(0, 0);
      }}
    >
      <div
        className={`icon icon--close icon--notActive ${styles.iconClose}`}
        onClick={onDelete}
      ></div>
      <img className={`${styles.img} hover--scale`} src={image} alt={name} />
      <p className={`${styles.name}`}>{name}</p>
      <div className={`${styles.bottom}`}>
        <div className={`${styles.buttons}`}>
          <button
            disabled={count === 1}
            className={`button--small ${getButtonSecondaryClass(darkTheme)}`}
            onClick={event => {
              setCount(prevCount => prevCount - 1);
              updateCount(count - 1);
              event.stopPropagation();
            }}
          >
            <div
              className={classNames('icon icon--minus', {
                'icon--notActive': count === 1,
              })}
            ></div>
          </button>
          <div className={`${styles.count} button button--small`}>{count}</div>
          <button
            className={`button--small ${getButtonSecondaryClass(darkTheme)}`}
            onClick={event => {
              setCount(prevCount => prevCount + 1);
              updateCount(count + 1);
              event.stopPropagation();
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
