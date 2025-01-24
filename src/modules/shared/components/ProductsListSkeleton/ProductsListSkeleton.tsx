import classNames from 'classnames';
import styles from './ProductsListSkeleton.module.scss';
import { useEffect, useRef, useState } from 'react';
import { ProductCardSkeleton } from '../ProductCardSkeleton';
import { LoadingStatus } from '../../types/enums';
import { ErrorNotification } from '../ErrorNotification';
import { HandleReloadClick } from '../../types/handlers';

type Props = {
  loadingStatus: LoadingStatus;
  onReloadClick: HandleReloadClick;
  responseStatus?: number;
  className?: string;
};

export const ProductsListSkeleton: React.FC<Props> = ({
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
    <div className={classNames(styles.ProductsListSkeleton, className)}>
      <ul ref={listRef} className={classNames(styles.List)}>
        {getProductCardSkeletons()}
      </ul>

      {loadingStatus === LoadingStatus.Error && (
        <ErrorNotification
          onReloadClick={onReloadClick}
          responseStatus={responseStatus}
        />
      )}
    </div>
  );
};
