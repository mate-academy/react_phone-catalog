import { ProductWithYear } from '../../types/product';
import { ProductDetailsPage } from '../ProductDetailsPage/ProductDetailsPage';
import styles from './ProductSlider.module.scss';
import { arrowLeft, arrowRight } from '../../icons';
import { useAppSelector } from '../../app/hooks';

type Props = {
  items: ProductWithYear[];
  offset: number;
  discount: boolean;
  nextOffset: () => void;
  prevOffset: () => void;
  title: string;
};

export const ProductSlider: React.FC<Props> = ({
  items,
  offset,
  discount,
  nextOffset,
  prevOffset,
  title,
}) => {
  const { maxScroll } = useAppSelector(state => state.scroll);

  return (
    <>
      <div className={styles.sliderContainer}>
        <h2 className={styles.category}>{title}</h2>
        <div className={styles.buttonWrapper}>
          <button
            className={styles.button}
            onClick={prevOffset}
            disabled={offset === 0}
          >
            <img src={arrowLeft} alt="arrow-left" />
          </button>
          <button
            className={styles.button}
            onClick={nextOffset}
            disabled={offset === maxScroll}
          >
            <img src={arrowRight} alt="arrow-right" />
          </button>
        </div>
      </div>
      <div className={styles.container}>
        {items.map(item => (
          <ProductDetailsPage
            key={item.id}
            item={item}
            offset={offset}
            discount={discount ? item.priceRegular : undefined}
          />
        ))}
      </div>
    </>
  );
};
