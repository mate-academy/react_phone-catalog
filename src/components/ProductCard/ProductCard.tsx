import React, { useEffect, useState } from 'react';
import './ProductCard.scss';
import { ProductItem } from '../ProductItem/ProductItem';
import back from '../../img/arrowLeft.svg';
import goto from '../../img/arrowRight.svg';
import { Product } from '../../types/ProductTipes';
import { useSwipeable } from 'react-swipeable';

interface Props {
  title: string;
  products: Product[];
  AdditionalPrice?: boolean;
}
export const ProductSlider: React.FC<Props> = ({
  title,
  products,
  AdditionalPrice = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4); // it should be checked
  const updateItemsPerPage = () => {
    if (window.innerWidth <= 480) {
      setItemsPerPage(2);
    } else if (window.innerWidth <= 768) {
      setItemsPerPage(3);
    } else {
      setItemsPerPage(4);
    }
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);

    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, []);

  const handleNext = () => {
    if (currentIndex + 1 < products.length - (itemsPerPage - 1)) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex - 1 >= 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
  });

  return (
    <div className="product" {...handlers}>
      <div className="product__titleButton">
        {/*check later */}
        <h2 className="category__title">{title}</h2>
        <div className="button">
          <button
            className="prevBtn"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <img src={back} alt="previous" />
          </button>
          <button
            className="nextBtn"
            onClick={handleNext}
            disabled={currentIndex + itemsPerPage >= products.length}
          >
            <img src={goto} alt="Goto" />
          </button>
        </div>
      </div>

      <div className="wrapper">
        <div className="product__cards">
          {products
            .slice(currentIndex, currentIndex + itemsPerPage)
            .map(product => (
              <ProductItem
                key={product.id}
                product={product}
                AdditionalPrice={AdditionalPrice}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
