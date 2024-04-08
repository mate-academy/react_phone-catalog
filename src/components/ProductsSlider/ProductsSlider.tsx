import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

import './ProductsSlider.scss';
import '../../style/title.scss';

// const somePhones: Product[] = [
//   {
//     id: 1,
//     category: 'phones',
//     itemId: 'apple-iphone-7-32gb-black',
//     name: 'Apple iPhone 7 32GB Black',
//     fullPrice: 400,
//     price: 375,
//     screen: "4.7' IPS",
//     capacity: "32GB",
//     "color": "black",
//     "ram": "2GB",
//     "year": 2016,
//     "image": "img/phones/apple-iphone-7/black/00.webp"
//   },
//   {
//     "id": 2,
//     "category": "phones",
//     "itemId": "apple-iphone-7-plus-32gb-black",
//     "name": "Apple iPhone 7 Plus 32GB Black",
//     "fullPrice": 540,
//     "price": 500,
//     "screen": "5.5' IPS",
//     "capacity": "32GB",
//     "color": "black",
//     "ram": "3GB",
//     "year": 2016,
//     "image": "img/phones/apple-iphone-7-plus/black/00.webp"
//   },
// ];

type Props = {
  products: Product[];
  unitName: string;
};

export const ProductsSlider: React.FC<Props> = ({ products, unitName }) => {
  // const [statePhones] = useState(somePhones);

  const [startProductIndex, setStartProductIndex] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1200);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsDesktop(window.innerWidth >= 1200);
  //   };

  //   window.addEventListener('resize', handleResize);

  //   setIsDesktop(window.innerWidth >= 1200);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, [products.length]);

  //#region touch-mouse handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDown(true);
    setStartX(e.clientX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown || !sliderRef.current) {
      return;
    }

    e.preventDefault();

    const x = e.clientX - (sliderRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;

    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];

    setIsDown(true);
    setStartX(touch.clientX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDown || !sliderRef.current) {
      return;
    }

    e.preventDefault();
    const touch = e.touches[0];
    const x = touch.clientX - (sliderRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;

    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDown(false);
  };

  //#endregion

  // const showVisibleProducts = () => {
  //   if (isDesktop) {
  //     return products.slice(startProductIndex, startProductIndex + 4);
  //   }

  //   return products;
  // };
  const visibleFourProducts = products.slice(
    startProductIndex,
    startProductIndex + 4,
  );

  const goToPrevSet = () => {
    if (startProductIndex > 0) {
      setStartProductIndex(prevIndex => prevIndex - 1);
    }
  };

  const goToNextSet = () => {
    if (startProductIndex < products.length - 4) {
      setStartProductIndex(prevIndex => prevIndex + 1);
    }
  };

  return (
    <>
      <div className="slider__top">
        <h1 className="title slider__name">{unitName}</h1>
        <div className="slider__arrows">
          <button
            type="button"
            className={cn('slider__arrow slider__arrow--left', {
              'slider__arrow--disabled': startProductIndex === 0,
            })}
            onClick={goToPrevSet}
            aria-label="Previous"
          />
          <button
            type="button"
            className={cn('slider__arrow', {
              'slider__arrow--disabled':
                startProductIndex + 4 === products.length,
            })}
            onClick={goToNextSet}
            aria-label="Next"
          />
        </div>
      </div>
      <div
        className="slider__container"
        data-cy="cardsContainer"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="slider__cards slider__cards--desktop">
          {visibleFourProducts.map(product => (
            <Link
              to={`/${product.category}/${product.itemId}`}
              className="slider__link"
              key={product.id}
            >
              <ProductCard product={product} key={product.id} />
            </Link>
          ))}
        </div>

        <div className="slider__cards slider__cards--mobile">
          {products.map(product => (
            <Link
              to={`/${product.category}/${product.itemId}`}
              className="slider__link"
              key={product.id}
            >
              <ProductCard product={product} key={product.id} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
