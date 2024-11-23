import { useState } from 'react';
import { Product } from '../../types/Product';
import ProductCard from '../ProductCard';
import Subtitle from '../Subtitle';
import style from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: Product[];
};

const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;
  const cardWidth = 272;
  const gap = 16;
  const itemFullWidth = cardWidth + gap;

  const handleClickNext = () => {
    if (currentIndex + itemsPerPage < products.length) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleClickPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };

  const showProducts = products.map(item => (
    <ProductCard key={item.id} product={item} />
  ));

  return (
    <div className="container">
      <section className={style.slider}>
        <div className={style.top}>
          <Subtitle text={title} />
          <div className={style.block}>
            <button
              className={`${style.btn} ${currentIndex === 0 ? style.disabled : ''}`}
              disabled={currentIndex === 0}
              onClick={handleClickPrev}
            >
              <img src="/img/icons/arrow-left.svg" alt="#" />
            </button>
            <button
              className={`${style.btn} ${currentIndex + itemsPerPage >= products.length ? style.disabled : ''}`}
              onClick={handleClickNext}
              disabled={currentIndex + itemsPerPage >= products.length}
            >
              <img src="/img/icons/arrow-right.svg" alt="#" />
            </button>
          </div>
        </div>

        <div className={style.bottom}>
          <div
            className={style.sliderTrack}
            style={{
              transform: `translateX(-${currentIndex * itemFullWidth}px)`,
            }}
          >
            {showProducts}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsSlider;
