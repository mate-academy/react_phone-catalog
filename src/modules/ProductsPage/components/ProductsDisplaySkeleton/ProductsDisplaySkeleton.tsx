import classNames from 'classnames';
import styles from './ProductsDisplaySkeleton.module.scss';
// eslint-disable-next-line max-len
import { ProductsListControls } from '../../../shared/components/ProductsListControls';
import { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line max-len
import { ProductCardSkeleton } from '../../../shared/components/ProductCardSkeleton';
import { LoadingStatus } from '../../../shared/types/enums';
// eslint-disable-next-line max-len
import { ErrorNotification } from '../../../shared/components/ErrorNotification';
import { HandleReloadClick } from '../../../shared/types/handlers';

type Props = {
  loadingStatus: LoadingStatus;
  onReloadClick: HandleReloadClick;
  responseStatus?: number;
  className?: string;
};

export const ProductsDisplaySkeleton: React.FC<Props> = ({
  loadingStatus,
  onReloadClick,
  responseStatus,
  className,
}) => {
  const [amountOfCards, setAmountOfCards] = useState(1);
  const listRef = useRef<HTMLUListElement>(null);

  const getProductCardSkeletons = (): React.JSX.Element[] => {
    return Array.from({ length: amountOfCards }, (_element, index) => (
      <li key={index}>
        <ProductCardSkeleton
          loadingStatus={loadingStatus}
          className={styles.ProductCard}
        />
      </li>
    ));
  };

  useEffect(() => {
    const handleResize = () => {
      const list = listRef.current;
      const item = list?.firstElementChild;

      if (item) {
        const listWidth = parseFloat(getComputedStyle(list).width);
        const productCardWidth = parseFloat(getComputedStyle(item).width);
        const newAmountOfCards = Math.floor(listWidth / productCardWidth);

        setAmountOfCards(newAmountOfCards < 2 ? 2 : newAmountOfCards);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className={classNames(styles.ProductsDisplaySkeleton, className)}>
      <header className={styles.Header}>
        <p className={styles.AmountOfProducts} />

        <ProductsListControls
          amountOfProducts={0}
          className={styles.ListControls}
        />
      </header>

      <ul ref={listRef} className={styles.List}>
        {getProductCardSkeletons()}
      </ul>

      {loadingStatus === LoadingStatus.Error && (
        <ErrorNotification
          onReloadClick={onReloadClick}
          responseStatus={responseStatus}
        />
      )}
    </section>
  );
};
