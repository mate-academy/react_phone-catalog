import { useState, useCallback, useEffect } from 'react';
import styles from './ProductSection.module.scss';
import { IconButton } from '../IconButton';
import { ProductSlider } from './components/ProductSlider';
import { Product } from '../../types/Product';
import { getImageUrl } from '../../utils/getImageUrl';
import useEmblaCarousel from 'embla-carousel-react';

interface Props {
  title: string;
  products: Product[];
}

export const ProductsSection: React.FC<Props> = ({ title, products }) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(false);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className={styles.section}>
      <div className={styles.section__header}>
        <h2 className={styles.section__title}>{title}</h2>

        <div className={styles.section__actions}>
          <IconButton disabled={prevBtnDisabled} onClick={scrollPrev}>
            <img src={getImageUrl('/icons/arrow-left.svg')} alt="Previous" />
          </IconButton>
          <IconButton disabled={nextBtnDisabled} onClick={scrollNext}>
            <img src={getImageUrl('/icons/arrow-right.svg')} alt="Next" />
          </IconButton>
        </div>
      </div>

      <div className={styles.section__content}>
        <ProductSlider products={products} emblaRef={emblaRef} />
      </div>
    </section>
  );
};
