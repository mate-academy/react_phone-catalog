import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useAppSelector } from '../../redux/hooks';
import { selectProducts } from '../../redux/slices/productsSlice';
import { SliderProduct } from '../../types/SliderProduct';
import { getSequence } from '../../utils/getSequence';
import { ProductCard } from '../ProductCard';
import { SkeletonCard } from '../SkeletonCard';
import { ErrorNotification } from '../ErrorNotification';
import styles from './ProductsSlider.module.scss';

interface Props {
  title: string;
  products: SliderProduct[];
  showFullPriceOnly?: boolean;
}

const CARD_WIDTH_MOBILE = 212;
const CARD_WIDTH_TABLET = 237;
const CARD_WIDTH_DESKTOP = 272;
const CARDS_GAP = 16;
const STEP_MOBILE = 1;
const STEP_TABLET = 2;
const STEP_DESKTOP = 4;

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  showFullPriceOnly = false,
}) => {
  const { productsLoading, productsErrorMsg } = useAppSelector(selectProducts);

  const [isPrevBtnDisabled, setIsPrevBtnDisabled] = useState<boolean>(true);
  const [isNextBtnDisabled, setIsNextBtnDisabled] = useState<boolean>(false);

  const productsRef = useRef<HTMLDivElement | null>(null);
  const resizeTimeoutId = useRef<number>(0);

  const isBtnDisabled =
    productsLoading || !!productsErrorMsg || products.length <= 1;

  const sequence = getSequence(1, 8);

  const checkScrollExistence = useCallback(
    (slider: HTMLDivElement): boolean => {
      const scrollWidth = slider.scrollWidth;
      const offsetWidth = slider.offsetWidth;

      return scrollWidth > offsetWidth;
    },
    [],
  );

  const resizeWindow = useCallback(() => {
    if (!productsRef.current) {
      return;
    }

    const isScrollExist = checkScrollExistence(productsRef.current);

    if (!isScrollExist) {
      setIsPrevBtnDisabled(true);
      setIsNextBtnDisabled(true);

      return;
    }

    productsRef.current.scrollLeft = 0;
    setIsPrevBtnDisabled(true);
    setIsNextBtnDisabled(false);
  }, [checkScrollExistence]);

  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimeoutId.current);
    resizeTimeoutId.current = window.setTimeout(resizeWindow, 200);
  });

  const handleBtnPrevClick = useCallback(() => {
    if (!productsRef.current) {
      return;
    }

    setIsNextBtnDisabled(false);

    const productsField = productsRef.current;
    const card = productsField.children[0] as HTMLDivElement;
    const cardWidth = card.offsetWidth;

    let shift = 0;

    switch (cardWidth) {
      case CARD_WIDTH_MOBILE:
        shift = STEP_MOBILE * (cardWidth + CARDS_GAP);

        break;

      case CARD_WIDTH_TABLET:
        shift = STEP_TABLET * (cardWidth + CARDS_GAP);

        break;

      case CARD_WIDTH_DESKTOP:
        shift = STEP_DESKTOP * (cardWidth + CARDS_GAP);

        break;

      default:
        break;
    }

    if (productsField.scrollLeft - shift <= 0) {
      setIsPrevBtnDisabled(true);
    }

    productsField.scrollLeft -= shift;
  }, []);

  const handleBtnNextClick = useCallback(() => {
    if (!productsRef.current) {
      return;
    }

    setIsPrevBtnDisabled(false);

    const productsField = productsRef.current;
    const card = productsField.children[0] as HTMLDivElement;
    const cardWidth = card.offsetWidth;

    let shift = 0;

    switch (cardWidth) {
      case CARD_WIDTH_MOBILE:
        shift = STEP_MOBILE * (cardWidth + CARDS_GAP);

        break;

      case CARD_WIDTH_TABLET:
        shift = STEP_TABLET * (cardWidth + CARDS_GAP);

        break;

      case CARD_WIDTH_DESKTOP:
        shift = STEP_DESKTOP * (cardWidth + CARDS_GAP);

        break;

      default:
        break;
    }

    const maxScroll = productsField.scrollWidth - productsField.offsetWidth;

    if (productsField.scrollLeft + shift >= maxScroll) {
      setIsNextBtnDisabled(true);
    }

    productsField.scrollLeft += shift;
  }, []);

  useEffect(() => {
    if (!productsRef.current) {
      return;
    }

    const isScrollExist = checkScrollExistence(productsRef.current);

    if (!isScrollExist) {
      setIsPrevBtnDisabled(true);
      setIsNextBtnDisabled(true);
    }
  }, [productsLoading, checkScrollExistence]);

  return (
    <div>
      <div className={styles.topBar}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.buttons}>
          <button
            type="button"
            className={classNames(styles.btn, styles.btnPrev)}
            disabled={isBtnDisabled || isPrevBtnDisabled}
            onClick={handleBtnPrevClick}
          ></button>

          <button
            type="button"
            className={classNames(styles.btn, styles.btnNext)}
            disabled={isBtnDisabled || isNextBtnDisabled}
            onClick={handleBtnNextClick}
          ></button>
        </div>
      </div>

      {productsLoading && (
        <div className={styles.products}>
          {sequence.map(n => (
            <SkeletonCard key={n} sliderCard={true} />
          ))}
        </div>
      )}

      {!productsLoading && productsErrorMsg && (
        <ErrorNotification errorMsg={productsErrorMsg} inSlider={true} />
      )}

      {!productsLoading && !productsErrorMsg && !products.length && (
        <ErrorNotification noProducts={true} inSlider={true} />
      )}

      {!productsLoading && !productsErrorMsg && !!products.length && (
        <div ref={productsRef} className={styles.products}>
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              sliderCard={true}
              showFullPriceOnly={showFullPriceOnly}
            />
          ))}
        </div>
      )}
    </div>
  );
};
