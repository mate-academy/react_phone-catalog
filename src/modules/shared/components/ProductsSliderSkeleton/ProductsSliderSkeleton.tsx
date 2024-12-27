import { IconButtonSVGOption, LoadingStatus } from '../../types/enums';
import { useLanguage } from '../Contexts/LanguageContext';
import { IconButton } from '../IconButton';
import styles from './ProductsSliderSkeleton.module.scss';
import { useEffect, useRef, useState } from 'react';
import { ProductCardSkeleton } from '../ProductCardSkeleton';
import { HandleReloadClick } from '../../types/handlers';
import { ErrorNotification } from '../ErrorNotification';

type Props = {
  title: string;
  loadingStatus: LoadingStatus;
  onReloadClick: HandleReloadClick;
  responseStatus?: number;
};

export const ProductsSliderSkeleton: React.FC<Props> = ({
  title,
  loadingStatus,
  onReloadClick,
  responseStatus,
}) => {
  const [amountOfCards, setAmountOfCards] = useState(1);
  const listRef = useRef<HTMLUListElement>(null);
  const { accessLoadingProducts, accessLoadingProductsFailed } =
    useLanguage().localeTexts;

  const getProductCardSkeletons = (): React.JSX.Element[] => {
    return Array.from({ length: amountOfCards }, (_element, index) => (
      <li key={index} className={styles.Item}>
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
        const listStyles = getComputedStyle(list);
        const gap = parseFloat(listStyles.gap);
        const listWidth = parseFloat(listStyles.width);
        const productCardWidth = parseFloat(getComputedStyle(item).width);

        const padding = (list.clientWidth - listWidth) / 2;
        const restOfListWidth = listWidth + padding;
        const cardSwipeWidth = productCardWidth + gap;

        setAmountOfCards(Math.ceil((restOfListWidth + gap) / cardSwipeWidth));
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const buttonInfo =
    loadingStatus === LoadingStatus.Loading
      ? accessLoadingProducts
      : accessLoadingProductsFailed;

  return (
    <section className={styles.ProductsSliderSkeleton}>
      <header className={styles.Header}>
        <h3 className={styles.Title}>{title}</h3>

        <div className={styles.Buttons}>
          <IconButton
            svgOption={IconButtonSVGOption.LeftArrow}
            disabled
            label={buttonInfo}
          />

          <IconButton
            svgOption={IconButtonSVGOption.RightArrow}
            disabled
            label={buttonInfo}
          />
        </div>
      </header>

      <div className={styles.Wrapper}>
        <ul className={styles.List} ref={listRef}>
          {getProductCardSkeletons()}
        </ul>
      </div>

      {loadingStatus !== LoadingStatus.Loading && (
        <ErrorNotification
          onReloadClick={onReloadClick}
          responseStatus={responseStatus}
        />
      )}
    </section>
  );
};
