import classNames from 'classnames';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';
import styles from './EmptyCart.module.scss';

type Props = {
  className?: string;
};

export const EmptyCart: React.FC<Props> = ({ className }) => {
  const { emptyCart } = useLanguage().localeTexts;

  return (
    <section className={classNames(styles.EmptyCart, className)}>
      <img
        src="/img/page-infos/cart-is-empty.png"
        alt={emptyCart}
        className={styles.Image}
      />

      <h1 className={styles.Title}>{emptyCart}</h1>
    </section>
  );
};
