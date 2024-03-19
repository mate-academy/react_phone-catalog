/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect, useCallback } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { getProducts } from '../../api/products';

import './YouMayAlsoLike.scss';

// @ts-ignore
import arrow from '../../images/icons/arrow.svg';

export const YouMayAlsoLike: React.FC = () => {
  const [youMayLike, setYouMayLike] = useState<Product[]>([]);
  const [counter, setCounter] = useState(0);
  const [displayedProducts, setDisplayedProducts]
    = useState<Product[] | null>(null);

  const getSuggestedProducts = useCallback(() => {
    const shuffledProducts = [...(youMayLike || [])]
      .sort(() => Math.random() - 0.5);

    const slicedProducts = shuffledProducts.slice(counter, counter + 4);

    setDisplayedProducts(slicedProducts);
  }, [youMayLike, counter]);

  const handleDecrement = () => {
    setCounter((prevCounter) => Math.max(prevCounter - 4, 0));
  };

  const handleIncrement = () => {
    setCounter((prevCounter) => prevCounter + 4);
  };

  useEffect(() => {
    getProducts()
      .then(product => setYouMayLike(product));
  }, []);

  useEffect(() => {
    getSuggestedProducts();
  }, [youMayLike, counter, getSuggestedProducts]);

  return (
    <div
      className="youMayLike"
    >
      <div className="youMayLike__header">
        <h1 className="youMayLike__title">You may also like</h1>
        <div className="youMayLike__buttons">
          <button
            type="button"
            className="youMayLike__button"
            disabled={counter === 0}
            onClick={() => handleDecrement()}
          >
            <img
              src={arrow}
              alt="arrow_left"
              className="youMayLike__arrow-left"
            />
          </button>
          <button
            type="button"
            className="youMayLike__button"
            disabled={!!youMayLike && counter + 4 >= youMayLike.length}
            onClick={() => handleIncrement()}
          >
            <img
              src={arrow}
              alt="arrow_right"
              className="youMayLike__arrow-right"
            />
          </button>
        </div>
      </div>
      <div className="youMayLike__bottom">
        {displayedProducts?.map(product => (
          <ProductCard product={product} isHotPrice={false} key={product.id} />
        ))}
      </div>
    </div>
  );
};
