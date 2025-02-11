import { useContext, useEffect, useRef, useState } from 'react';
import { ProductsType } from '../../types/Products';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';
import { Loader } from '../Loader';
import { sortFunction } from '../../utils/Sort';
import { ArrowIcon } from '../Icons/Arrow';
import { ProductContext } from '../Contexts/ProductsContext';

export type SliderItems = 'Hotest' | 'Newest' | 'Suggested';

type Props = {
  itemsType: SliderItems;
  title: string;
};

const CARDS_GAP = 16;

export const ProductsSlider: React.FC<Props> = ({ itemsType, title }) => {
  const { products, loading, error } = useContext(ProductContext);

  const [itemsList, setItemsList] = useState<ProductsType[]>([]);

  const getSuggestedProducts = () => {
    const arrayCopy = [...products];

    const result = [];

    while (arrayCopy.length > 0) {
      const randomIndex = Math.floor(Math.random() * arrayCopy.length);

      result.push(arrayCopy[randomIndex]);
      arrayCopy.splice(randomIndex, 1);
    }

    return result;
  };

  const findItems = () => {
    if (itemsType === 'Suggested') {
      setItemsList(getSuggestedProducts());

      return;
    }

    setItemsList(sortFunction(itemsType, products).slice(0, 15));
  };

  useEffect(() => {
    findItems();
  }, [products]);

  const cardRef = useRef<HTMLLIElement>(null);
  const carouselRef = useRef<HTMLUListElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const prevDisabled = activeIndex === 0;
  const nextDisabled = activeIndex === itemsList.length - 4;

  const handlePrevClick = () => {
    if (carouselRef.current && cardRef.current) {
      const cardWidth = cardRef.current.offsetWidth + CARDS_GAP;

      carouselRef.current.scrollLeft -= cardWidth;

      setActiveIndex(activeIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (carouselRef.current && cardRef.current) {
      const cardWidth = cardRef.current.offsetWidth + CARDS_GAP;

      carouselRef.current.scrollLeft += cardWidth;

      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <div className={styles.productsSlider}>
      <div className={styles.sliderTitle}>
        <h2>{title}</h2>

        <div className={styles.titleButtons}>
          <button
            className="button toggle backBtn prev"
            onClick={handlePrevClick}
            disabled={prevDisabled}
          >
            <span className="icon">
              <ArrowIcon disabled={prevDisabled} />
            </span>
          </button>
          <button
            className="button toggle next"
            onClick={handleNextClick}
            disabled={nextDisabled}
          >
            <span className="icon">
              <ArrowIcon disabled={nextDisabled} />
            </span>
          </button>
        </div>
      </div>

      {loading && <Loader />}

      {!loading && !error && itemsList.length > 0 && (
        <div className={styles.wrapper}>
          <ul className={styles.carousel} ref={carouselRef}>
            {itemsList.map(item => (
              <li key={item.id} className={styles.item} ref={cardRef}>
                <ProductCard productItem={item} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
