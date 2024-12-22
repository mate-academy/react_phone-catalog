import Slider, { CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './PageSlider.scss';

import { useEffect, useRef, ReactNode } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { useArrowSpacing, useLoader, useShuffledProducts } from '../../../hooks/Hooks';
import { ProductSliderProps } from '../../../types/TSlider';
import { Loader } from '../../../services/helpers/Loader/Loader';

const NextArrow: React.FC<CustomArrowProps> = ({ className, onClick }) => {
  return (
    <div
      className={`slick-next ${className}`}
      style={{
        position: 'relative',
        height: '32px',
        inset: '16px 0px 0px 10px',
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow: React.FC<CustomArrowProps> = ({ className, onClick }) => {
  return (
    <div
      className={`slick-prev ${className}`}
      style={{
        position: 'relative',
        height: '32px',
        inset: '16px 0 0',
      }}
      onClick={onClick}
    />
  );
};

const num = 95; // amount of phones. search how to connect it!

export const PageSlider: React.FC<ProductSliderProps> = ({
  products,
  sliderTitle,
  showFullPrice,
}) => {
  const sliderRef = useRef<Slider | null>(null);
  const [shuffledProducts, sortArray, handleItem] = useShuffledProducts(products);
  const isLoading = useLoader();
  const arrowSpacing = useArrowSpacing(sliderRef);

  useEffect(() => {
    if (sliderRef.current && shuffledProducts.length > 0) {
      sliderRef.current.slickGoTo(0);
    }
  }, [sliderRef, shuffledProducts]);

  const settings = {
    className: 'page-slider',
    dots: true,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    rows: 16,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],

    appendDots: (dots: ReactNode[]) => {
      const totalDots = dots.length;

      return (
        <div
          style={{
            backgroundColor: 'white',
            padding: '0px',
            zIndex: '100',
          }}
        >
          <ul className="page-slider__block-pad">
            <PrevArrow
              className="page-slider__arrow-prev"
              onClick={() => sliderRef.current?.slickPrev()}
              style={{ marginRight: arrowSpacing }}
            />
            {totalDots > 6 ? [...dots.slice(0, 4)] : dots}
            <NextArrow
              className="page-slider__arrow-next"
              onClick={() => sliderRef.current?.slickNext()}
              style={{ marginLeft: arrowSpacing }}
            />
          </ul>
        </div>
      );
    },
    customPaging: (i: number) => <div className="page-slider__dots">{i + 1}</div>,
  };

  return (
    <div className="page-slider__container">
      <h1 className="page-slider__title">{sliderTitle}</h1>
      <div className="page-slider__subtitle">{num} models</div>
      <section className="page-slider__sort">
        <article className="page-slider__sort-type">
          <p className="page-slider__sort-subtitle">Sort by</p>
          <select
            className="page-slider__sort-select"
            onChange={e => sortArray(e.target.value)}
            defaultValue="alphabetically"
          >
            <option value="oldest">Oldest</option>
            <option value="newest">Newest</option>
            <option value="cheapest">Cheapest</option>
            <option value="expensive">Expensive</option>
            <option value="alphabetically">Alphabetically</option>
          </select>
        </article>
        <article className="page-slider__sort-item">
          <p className="page-slider__sort-subtitle">Items on page</p>
          <select
            className="page-slider__sort-select"
            onChange={e => handleItem(e.target.value)}
            defaultValue="all"
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </article>
      </section>
      {isLoading ? (
        <Loader />
      ) : (
        <Slider ref={sliderRef} {...settings}>
          {shuffledProducts.map(product => (
            <div key={product.id} className="slider__block">
              <ProductCard product={product} showFullPrice={showFullPrice} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};
