import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './NewModels.module.scss';
import { useMyContext } from '../../../Context/ProductContexts';
import { ProductList } from '../../../shared/ProductList';
import { ProductDemo } from '../../../types/ProductDemo';

export const NewModels: React.FC = () => {
  const { products } = useMyContext();
  const [sortedModels, setSortedModels] = useState<ProductDemo[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
  });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const newIphoneModels = products
      .filter(product => product.name.includes('iPhone 14'))
      .sort((a, b) => b.year - a.year);

    setSortedModels(newIphoneModels);
  }, [products]);

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
    <div className={styles.newModels}>
      <div className={styles.topBar}>
        <div className={styles.topBar_title}>
          <h2>Brand new models</h2>
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

      <ProductList emblaRef={emblaRef} data={sortedModels} />
    </div>
  );
};
