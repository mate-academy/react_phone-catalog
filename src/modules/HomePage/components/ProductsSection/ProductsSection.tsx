import { useState, useCallback } from 'react';
import classNames from 'classnames';
import styles from '../../HomePage.module.scss';
import { IconButton } from '../../../shared/components/IconButton';
// eslint-disable-next-line max-len
import { ProductSlider } from '../../../shared/components/ProductsSection/components/ProductSlider';
import { Product } from '../../../shared/types/Product';

interface Props {
  title: string;
  products: Product[];
}

export const ProductsSection: React.FC<Props> = ({ title, products }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const total = products.length;

  const nextCard = useCallback(
    () => currentCard + 1 <= total && setCurrentCard(current => current + 1),
    [total, currentCard],
  );

  const prevCard = useCallback(
    () => currentCard - 1 > 0 && setCurrentCard(current => current - 1),
    [currentCard],
  );

  return (
    <section className={classNames(styles.section, styles['section--slider'])}>
      <div className={styles.section__header}>
        <h2 className={styles.section__title}>{title}</h2>

        <div className={styles.section__actions}>
          <IconButton disabled={currentCard === 0} onClick={() => prevCard()}>
            <img src="/icons/arrow-left.svg" alt="Previous" />
          </IconButton>
          <IconButton
            disabled={currentCard === total - 1}
            onClick={() => nextCard()}
          >
            <img src="/icons/arrow-right.svg" alt="Next" />
          </IconButton>
        </div>
      </div>

      <div className={styles.section__content}>
        <ProductSlider products={products} currentCard={currentCard} />
      </div>
    </section>
  );
};
