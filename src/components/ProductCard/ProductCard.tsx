import React, { useEffect, useState } from 'react';
// import { fetchProducts } from '../../utils/api';
import { Product } from '../../types/typeRpoduct';
import './ProductCard.scss';
import { ProductItem } from '../ProductItem/ProductItem';
interface Props {
  title: string;
  products: Product[];
  WithAdditionalPrice?: boolean;
}
export const ProductSlider: React.FC<Props> = ({
  title,
  products,
  WithAdditionalPrice = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
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

  return (
    <div className="product">
      <div className="product__titleButton">
        <h2 className="category__title">{title}</h2>
        <div className="button">
          <button
            className="buttonPrev"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            &lt;
          </button>
          <button
            className="buttonNext"
            onClick={handleNext}
            disabled={currentIndex + itemsPerPage >= products.length}
          >
            &gt;
          </button>
        </div>
      </div>
      <div className="product__cards">
        {products
          .slice(currentIndex, currentIndex + itemsPerPage)
          .map(product => (
            <ProductItem
              key={product.id}
              product={product}
              WithAdditionalPrice={WithAdditionalPrice}
            />
          ))}
      </div>
    </div>
  );
};
