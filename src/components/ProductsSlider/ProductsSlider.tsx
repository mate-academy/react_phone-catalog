/* eslint-disable no-console */
import { useState, useMemo } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductsSlider.scss';

type Props = {
  products: Product[];
  filter?: string;
  title: string;
};

export const ProductsSlider: React.FC<Props> = ({
  products,
  filter,
  title,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    if (currentIndex < (products.length - 4)) {
      setCurrentIndex(prevState => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
  };

  const getHotPriceProducts = useMemo(() => {
    const result = [...products].filter(product => product.discount !== 0);

    result.sort((a, b) => {
      const aDiscountValue = a.price - a.price * ((100 - a.discount) / 100);
      const bDiscountValue = b.price - b.price * ((100 - b.discount) / 100);

      return bDiscountValue - aDiscountValue;
    });

    return result;
  }, [products, filter]);

  const getBrandNewProducts = useMemo(() => {
    const result = [...products].filter(product => product.discount === 0);

    result.sort((a, b) => {
      return b.price - a.price;
    });

    return result;
  }, [products, filter]);

  const visileProducts = useMemo(() => {
    let result = [...products];

    if (filter === 'hotPrice') {
      result = getHotPriceProducts;
    }

    if (filter === 'newModels') {
      result = getBrandNewProducts;
    }

    return result;
  }, [products, filter]);

  return (
    <>
      <div className="ProductsSlider__top">
        <h1 className="page__sectionTitle ProductsSlider__title">{title}</h1>
        <div className="ProductsSlider__controls">
          <button
            type="button"
            className="
              arrowButton
              button
              arrowButton--left
            "
            disabled={currentIndex === 0}
            onClick={prev}
          >
            &nbsp;
          </button>
          <button
            type="button"
            className="
              arrowButton
              button
              arrowButton--right
            "
            disabled={currentIndex === visileProducts.length - 4}
            onClick={next}
          >
            &nbsp;
          </button>
        </div>
      </div>
      <div
        className="ProductsSlider__content"
        style={{
          transform: `translateX(${-currentIndex * 288}px)`,
        }}
      >
        {visileProducts.map(prod => (
          <ProductCard product={prod} key={prod.id} />
        ))}
      </div>
    </>
  );
};
