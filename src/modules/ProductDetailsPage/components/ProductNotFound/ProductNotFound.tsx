// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';
import styles from './ProductNotFound.module.scss';

export const ProductNotFound: React.FC = () => {
  const { productNotFound } = useLanguage().localeTexts;

  return (
    <section className={styles.ProductNotFound}>
      <img
        src="/img/page-infos/product-not-found.png"
        alt={productNotFound}
        className={styles.Image}
      />

      <h1 className={styles.Title}>{productNotFound}</h1>
    </section>
  );
};
