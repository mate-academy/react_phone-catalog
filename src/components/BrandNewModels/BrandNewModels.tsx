/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect, useCallback } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import './BrandNewModels.scss';
import { getProducts } from '../../api/products';

// @ts-ignore
import arrow from '../../images/icons/arrow.svg';

export const BrandNewModels: React.FC = () => {
  const [brandNewModel, setBrandNewModel] = useState<Product[]>([]);
  const [counter, setCounter] = useState(0);
  const [displayedProducts, setDisplayedProducts]
    = useState<Product[] | null>(null);

  const getBrandNewProducts = useCallback(() => {
    const sortedProducts = [...(brandNewModel || [])].sort((item1, item2) => {
      const year1 = item1.year;
      const year2 = item2.year;

      return year1 - year2;
    }).reverse();

    const slicedProducts = sortedProducts.slice(counter, counter + 4);

    setDisplayedProducts(slicedProducts);
  }, [brandNewModel, counter]);

  const handleDecrement = () => {
    setCounter((prevCounter) => Math.max(prevCounter - 4, 0));
  };

  const handleIncrement = () => {
    setCounter((prevCounter) => prevCounter + 4);
  };

  useEffect(() => {
    getProducts()
      .then(product => setBrandNewModel(product));
  }, []);

  useEffect(() => {
    getBrandNewProducts();
  }, [brandNewModel, counter]);

  return (
    <div
      className="brandNewModels"
      data-cy="categoryLinksContainer"
    >
      <div className="brandNewModels__header">
        <h1 className="brandNewModels__title">Brand new models</h1>
        <div className="brandNewModels__buttons">
          <button
            type="button"
            className="brandNewModels__button"
            disabled={counter === 0}
            onClick={() => handleDecrement()}
          >
            <img
              src={arrow}
              alt="arrow_left"
              className="brandNewModels__arrow-left"
            />
          </button>
          <button
            type="button"
            className="brandNewModels__button"
            disabled={!!brandNewModel && counter + 4 >= brandNewModel.length}
            onClick={() => handleIncrement()}
          >
            <img
              src={arrow}
              alt="arrow_right"
              className="brandNewModels__arrow-right"
            />
          </button>
        </div>
      </div>
      <div className="brandNewModels__bottom">
        {displayedProducts?.map(product => (
          <ProductCard product={product} isHotPrice={false} key={product.id} />
        ))}
      </div>
    </div>
  );
};
