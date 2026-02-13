import { CrossIcon } from '@shared/icons';
import styles from './CartItemWidget.module.scss';
import { LoaderSpinner } from '@ui/skeletons';
import { useGlobalActions } from '@features/index';

type Props = {
  name: string;
  id: string;
  total: string | number;
  amount: number;
  image: string;
};

export const CartItemWidget = ({ ...Props }: Props) => {
  const { name, total, amount, image, id } = Props;
  const { setCart } = useGlobalActions();

  const update = (mod: number) => {
    setCart({ id: id, amount: amount + mod <= 0 ? 0 : amount + mod });
  };

  const disabled = name === '';
  const nameStyle = name === '' ? styles['name-skeleton'] : styles.name;

  return (
    <li>
      <section className={styles['item-container']}>
        <h3 className={nameStyle}>{name}</h3>

        {image === '' ? (
          <LoaderSpinner />
        ) : (
          <img src={image} className={styles.image} />
        )}

        <button
          className={styles.clear}
          onClick={() => update(-Infinity)}
          disabled={disabled}
        >
          <CrossIcon />
        </button>
        <div className={styles['buttons-block']}>
          <button
            className={styles.button}
            onClick={() => update(-1)}
            disabled={disabled}
          >
            -
          </button>
          <output className={styles.output}>{amount}</output>
          <button
            className={styles.button}
            onClick={() => update(1)}
            disabled={disabled}
          >
            +
          </button>
        </div>
        <span className={styles.price}>{`$${total}`}</span>
      </section>
    </li>
  );
};
