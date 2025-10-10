/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
import styles from './NewModelSlider.module.scss';
import Slider from 'react-slick';
import { useContext, useEffect, useRef, useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from '../ArrowsSlider';
import { ShowOldPriceContext } from '../../context/OldPrice';
import { CategoryType } from '../../types/Category';
import { ProductDetails } from '../../types/ProductsDetails';

type Props = {
  detailProduct: ProductDetails | undefined;
};

export const ProductSlider: React.FC<Props> = ({ detailProduct }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const price = useContext(ShowOldPriceContext);
  const [isReady, setIsReady] = useState(false);
  const sliderRef = useRef<Slider>(null);

  const [initialSlides, setInitialSlides] = useState(4);

  useEffect(() => {
    const width = window.innerWidth;

    if (width < 639) {
      setInitialSlides(1);
    } else if (width < 1100) {
      setInitialSlides(2);
    } else {
      setInitialSlides(4);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    fetch(
      // eslint-disable-next-line max-len
      'https://raw.githubusercontent.com/mate-academy/react_phone-catalog/refs/heads/master/public/api/products.json',
    )
      .then(response => response.json())
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .then((products: Product[]) => {
        if (mounted) {
          setProducts(products);
        }
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => {
        setTimeout(() => setIsReady(true), 100);
      });

    const handleResize = () => sliderRef.current?.slickGoTo(0);

    window.addEventListener('resize', handleResize);

    return () => {
      mounted = false;
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isReady || products.length === 0) {
    return null;
  }

  const newestProducts = [...products].sort(
    (product1, product2) => product2.year - product1.year,
  );

  const discountProducts = [...products].sort((product1, product2) => {
    const dicsount1 = product1.fullPrice - product1.price;
    const dicsount2 = product2.fullPrice - product2.price;

    return dicsount2 - dicsount1;
  });

  const similarProducts = products.filter(
    item => detailProduct?.capacity === item.capacity,
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: initialSlides,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 2000,
        settings: { slidesToShow: 4, slidesToScroll: 1 },
      },
      {
        breakpoint: 1100,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 639,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className={styles['slider-wrapper']}>
      <Slider {...settings} ref={sliderRef}>
        {detailProduct
          ? similarProducts.map(product => (
              <div key={product.id}>
                <ProductCard
                  product={product}
                  showOldPrice={price}
                  category={product.category as CategoryType}
                />
              </div>
            ))
          : price
            ? discountProducts.map(product => (
                <div key={product.id}>
                  <ProductCard
                    product={product}
                    showOldPrice={price}
                    category={product.category as CategoryType}
                  />
                </div>
              ))
            : newestProducts.map(product => (
                <div key={product.id}>
                  <ProductCard
                    product={product}
                    showOldPrice={price}
                    category={product.category as CategoryType}
                  />
                </div>
              ))}
      </Slider>
    </div>
  );
};
