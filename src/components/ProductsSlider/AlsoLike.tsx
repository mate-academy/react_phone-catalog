/* eslint-disable @typescript-eslint/no-shadow */
import React, { useRef, useState, useEffect } from 'react';
import './ProductsSlider.scss';
import { Carusel } from '../Carusel/Carusel';
import { Product } from '../../types/Product';
import { SwiperClass } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { fetchProducts } from '../../state/productsSlice';

export const AlsoLike: React.FC = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  const swiperRef = useRef<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  function getSuggestedProducts(products: Product[]) {
    const shuffled = [...products].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, 20);
  }

  const sortedPhones = getSuggestedProducts(products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    const swiperInstance = swiperRef.current;

    if (swiperInstance) {
      const updateButtons = () => {
        setIsBeginning(swiperInstance.isBeginning);
        setIsEnd(swiperInstance.isEnd);
      };

      updateButtons();
      swiperInstance.on('slideChange', updateButtons);

      return () => {
        swiperInstance.off('slideChange', updateButtons);
      };
    }
  }, []);

  if (loading || error) {
    return (
      <div className="carusel">
        {loading && <p>Loading products...</p>}
        {error && <p>Error: {error}</p>}
      </div>
    );
  }

  return (
    <div className="carusel">
      <div className="carusel__container__head">
        <h2>Brand New Models</h2>
        <div className="carusel__buttons">
          <button
            className={`carusel__button carusel__button--prev ${isBeginning ? 'carusel__button--disabled' : ''}`}
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={isBeginning}
          ></button>
          <button
            className={`carusel__button carusel__button--next ${isEnd ? 'carusel__button--disabled' : ''}`}
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd}
          ></button>
        </div>
      </div>
      <Carusel products={sortedPhones} swiperRef={swiperRef} />
    </div>
  );
};
