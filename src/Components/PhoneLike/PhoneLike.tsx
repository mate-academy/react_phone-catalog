import { Link } from 'react-router-dom';
import arrowLeft from '../../images/icons/Chevron (Arrow Left).svg';
import arrowRight from '../../images/icons/Chevron (Arrow Right).svg';
import React, { useCallback, useEffect, useState } from 'react';
import { Products } from '../../types/Products';
import './PhoneLike.scss';
import { getProducts } from '../../api/api';
import { ProductSpecs } from '../ProductsSpec/ProductsSpec';

export const PhoneLike = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [productsPerSlide, setProductsPerSlide] = useState(4);
  const [, setLoading] = useState(true);
  const [, setErrorMessage] = useState('');

  const getProductsPerSlide = (width: number) =>
    width >= 1200 ? 4 : width >= 768 ? 3 : width >= 480 ? 2 : 1;

  useEffect(() => {
    const handleResize = () => {
      setProductsPerSlide(getProductsPerSlide(window.innerWidth));
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setActiveIndex(prev => {
      const maxStart = Math.max(0, products.length - productsPerSlide);

      return prev > maxStart ? maxStart : prev;
    });
  }, [products.length, productsPerSlide]);

  const handleProductChange = useCallback(
    (direction: 'next' | 'prev') => {
      setActiveIndex(prev => {
        const lastIndex = Math.max(0, products.length - productsPerSlide);

        if (direction === 'next') {
          return prev < lastIndex ? prev + 1 : 0;
        }

        return prev > 0 ? prev - 1 : lastIndex;
      });
    },
    [products.length, productsPerSlide],
  );

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    getProducts()
      .then(setProducts)
      .catch(() => setErrorMessage(`Couldn't load any tablets`))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="phone__like">
        <div className="phone__like-container">
          <h1 className="section-title">You may also like</h1>
          <div className="phone__like-arrows">
            <Link to="" className="phone__like-arrow-left">
              <button
                className="phone__like-arrow"
                onClick={() => handleProductChange('prev')}
              >
                <img src={arrowLeft} alt="" className="icon-arrow" />
              </button>
            </Link>
            <Link to="" className="phone__like-arrow-right">
              <button
                className="phone__like-arrow"
                onClick={() => handleProductChange('next')}
              >
                <img src={arrowRight} alt="" className="icon-arrow" />
              </button>
            </Link>
          </div>
        </div>
        <ProductSpecs
          products={products}
          currentSlide={activeIndex}
          visibleCount={productsPerSlide}
        />
      </section>
    </>
  );
};
