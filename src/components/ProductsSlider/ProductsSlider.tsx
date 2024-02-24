import { useCallback, useEffect, useState } from 'react';
import './ProductsSlider.scss';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/products';

import arrow from '../../images/icons/arrow.svg';
import { ProductCard } from '../ProductCard/ProductCard';

export const ProductsSlider: React.FC = () => {
  const [hotPrices, setHotPrices] = useState<Product[]>([]);
  const [counter, setCounter] = useState(0);
  const [displayedProducts, setDisplayedProducts]
    = useState<Product[]>([]);

  const getHotPriceProducts = useCallback(() => {
    const sortedProducts = [...(hotPrices || [])].sort((item1, item2) => {
      const absoluteAmount1 = item1.fullPrice - item1.price;
      const absoluteAmount2 = item2.fullPrice - item2.price;

      return absoluteAmount1 - absoluteAmount2;
    }).reverse();

    const slicedProducts = sortedProducts.slice(counter, counter + 4);

    setDisplayedProducts(slicedProducts);
  }, [hotPrices, counter]);

  const handleDecrement = () => {
    setCounter((prevCounter) => Math.max(prevCounter - 4, 0));
  };

  const handleIncrement = () => {
    setCounter((prevCounter) => prevCounter + 4);
  };

  useEffect(() => {
    getProducts()
      .then(product => setHotPrices(product));
  }, [hotPrices]);

  useEffect(() => {
    getHotPriceProducts();
  }, [hotPrices, counter, getHotPriceProducts]);

  return (
    <div className="productsSlider">
      <div className="productsSlider__header">
        <h1 className="productsSlider__title">Hot prices</h1>

        <div className="productsSlider__buttons">
          <button
            type="button"
            className="productsSlider__button"
            disabled={counter === 0}
            onClick={() => handleDecrement()}
          >
            <img
              src={arrow}
              alt="arrow_left"
              className="productsSlider__arrow-left"
            />
          </button>
          <button
            type="button"
            className="productsSlider__button"
            disabled={!!hotPrices && counter + 4 >= hotPrices.length}
            onClick={() => handleIncrement()}
          >
            <img
              src={arrow}
              alt="arrow_right"
              className="productsSlider__arrow-right"
            />
          </button>
        </div>
      </div>
      <div className="productsSlider__bottom">
        {displayedProducts?.map(product => (
          <ProductCard product={product} isHotPrice key={product.id} />
        ))}
      </div>
    </div>
  );
};
