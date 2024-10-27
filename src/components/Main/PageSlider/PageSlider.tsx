import Slider, { CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './PageSlider.scss';

import { PageProductCard } from '../PageProductCard/PageProductCard';
import { Product } from '../../../types/Product';
import { useEffect, useRef, useState, ReactNode } from 'react';

interface ProductSliderProps {
  products: Product[];
  showFullPrice: boolean;
  sliderTitle: string;
}

const NextArrow: React.FC<CustomArrowProps> = ({ className, onClick }) => {
  return <div className={`product-arrow__next product-arrow ${className}`} onClick={onClick} />;
};

const PrevArrow: React.FC<CustomArrowProps> = ({ className, onClick }) => {
  return <div className={`product-arrow__prev product-arrow ${className}`} onClick={onClick} />;
};

export const PageSlider: React.FC<ProductSliderProps> = ({
  products,
  sliderTitle,
  showFullPrice,
}) => {
  const sliderRef = useRef<Slider | null>(null);
  const [arrowSpacing, setArrowSpacing] = useState(20);

  useEffect(() => {
    const updateArrowSpacing = () => {
      if (
        sliderRef.current &&
        sliderRef.current.innerSlider &&
        sliderRef.current.innerSlider.list
      ) {
        const sliderWidth = sliderRef.current.innerSlider.list.offsetWidth;
        const newSpacing = Math.max((sliderWidth - 100) / 2, 20);

        setArrowSpacing(newSpacing);
      }
    };

    window.addEventListener('resize', updateArrowSpacing);
    updateArrowSpacing();

    return () => window.removeEventListener('resize', updateArrowSpacing);
  }, []);

  const settings = {
    className: 'product-slider',
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots: ReactNode[]) => {
      const totalDots = dots.length;

      return (
        <div
          style={{
            backgroundColor: '$c-white',
            borderRadius: '10px',
            padding: '10px',
          }}
        >
          <ul style={{ display: 'flex', gap: '5px', listStyleType: 'none', margin: '5px' }}>
            {totalDots > 6
              ? [
                  ...dots.slice(0, 3), // Перші 3 dots
                  <li key="ellipsis">...</li>, // Три крапки
                  ...dots.slice(totalDots - 3), // Останні 3 dots
                ]
              : dots}
          </ul>
        </div>
      );
    },
    customPaging: (i: number) => (
      <div
        style={{
          width: '30px',
          color: 'blue',
          border: '1px $c-primary solid',
        }}
      >
        {i + 1}
      </div>
    ),
  };

  return (
    <div className="page-slider__container">
      <h2 className="slider-productcard__title">{sliderTitle}</h2>
      <div className="arrows-container">
        <PrevArrow
          className="page-slider-arrow__prev slick-prev"
          onClick={() => sliderRef.current?.slickPrev()}
          style={{ marginRight: arrowSpacing }}
        />
        <NextArrow
          className="page-slider-arrow__next slick-next"
          onClick={() => sliderRef.current?.slickNext()}
          style={{ marginLeft: arrowSpacing }}
        />
      </div>
      <Slider ref={sliderRef} {...settings}>
        {products.map(product => (
          <div key={product.id} className="slider__block">
            <PageProductCard product={product} showFullPrice={showFullPrice} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
