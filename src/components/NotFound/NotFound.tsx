import styles from './NotFound.module.scss';
import noResults from '/img/no-results.png';
import cart from '/img/cart-is-empty.png';

type Props = {
  title: string;
  mode: 'cart' | 'noResults';
};

const images = {
  cart: cart,
  noResults: noResults,
};

export const NotFound: React.FC<Props> = ({ title, mode }) => {
  return (
    <div className={styles.not_found}>
      <img src={images[mode]} alt="No results" className={styles.img} />

      <p className={styles.title}>{title}</p>
    </div>
  );
};
