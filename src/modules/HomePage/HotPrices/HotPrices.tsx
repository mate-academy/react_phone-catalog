import useEmblaCarousel from 'embla-carousel-react';
import { useMyContext } from '../../../Context/ProductContexts';
import styles from './HotPrices.module.scss';
import { useEffect, useState } from 'react';
import { ProductList } from '../../../shared/ProductList';
import { ProductDemo } from '../../../types/ProductDemo';

type HotPricesProps = {
  suggestedData?: ProductDemo[];
  productDetails?: boolean;
  setNewProduct?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HotPrices: React.FC<HotPricesProps> = ({
  productDetails,
  suggestedData,
  setNewProduct,
}) => {
  const { products } = useMyContext();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
  });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const hotPriceList = products.sort((a, b) => {
    const discountPrev = a.fullPrice - a.price;
    const discountNext = b.fullPrice - b.price;

    return discountNext - discountPrev;
  });

  const updateButtons = () => {
    if (!emblaApi) {
      return;
    }

    setCanScrollLeft(emblaApi.canScrollPrev());
    setCanScrollRight(emblaApi.canScrollNext());
  };

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    updateButtons();
    emblaApi.on('select', updateButtons);
    emblaApi.on('reInit', updateButtons);
  }, [emblaApi]);

  const scrollLeft = () => emblaApi?.scrollPrev();
  const scrollRight = () => emblaApi?.scrollNext();

  return (
    <div className={styles.hotPrices}>
      <div className={styles.topBar}>
        <div className={styles.topBar_title}>
          {productDetails ? <h2>You may also like</h2> : <h2>Hot prices</h2>}
        </div>

        <div className={styles.buttons}>
          <button
            disabled={!canScrollLeft}
            className={`${styles.button} ${styles.button_left}`}
            onClick={scrollLeft}
          >
            <img src={'img/Buttons/Icons/white left.svg'} alt="left" />
          </button>

          <button
            disabled={!canScrollRight}
            className={`${styles.button} ${styles.button_right}`}
            onClick={scrollRight}
          >
            <img src={'img/Buttons/Icons/white right.svg'} alt="right" />
          </button>
        </div>
      </div>

      {productDetails && suggestedData ? (
        <ProductList
          emblaRef={emblaRef}
          data={suggestedData}
          showFullPrice={true}
          setNewProduct={setNewProduct}
        />
      ) : (
        <ProductList
          emblaRef={emblaRef}
          data={hotPriceList}
          showFullPrice={true}
        />
      )}
    </div>
  );
};
