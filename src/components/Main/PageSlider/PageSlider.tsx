import Slider, { CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './PageSlider.scss';

import { Product } from '../../../types/Product';
import { useEffect, useRef, useState, ReactNode } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';

interface ProductSliderProps {
  products: Product[];
  showFullPrice: boolean;
  sliderTitle: string;
}

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

const shuffleArray = (array: Product[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const num = 95; // amount of phones. search how to connect it!

export const PageSlider: React.FC<ProductSliderProps> = ({
  products,
  sliderTitle,
  showFullPrice,
}) => {
  const sliderRef = useRef<Slider | null>(null);
  const [arrowSpacing, setArrowSpacing] = useState(20);
  const [shuffledProducts, setShuffledProducts] = useState<Product[]>([]);

  const sortArray = (type: string) => {
    const sortedProducts = [...shuffledProducts];

    switch (type) {
      case 'oldest':
        sortedProducts.sort((a, b) => a.year - b.year);
        break;
      case 'newest':
        sortedProducts.sort((a, b) => b.year - a.year);
        break;
      case 'cheapest':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'expensive':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'alphabetically':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setShuffledProducts(sortedProducts);
  };

  const handleItem = (item: string) => {
    if (item === 'all') {
      setShuffledProducts(products);
    } else {
      const numItem = parseInt(item, 10);

      setShuffledProducts(products.slice(0, numItem));
    }
  };

  useEffect(() => {
    setShuffledProducts(shuffleArray(products));
  }, [products]);

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
    className: 'page-slider',
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    rows: 16,
    responsive: [
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
      <div className="page-slider__sort">
        <div className="page-slider__sort-type">
          <p className="page-slider__sort-subtitle">Sort by</p>
          <select className="page-slider__sort-select" onChange={e => sortArray(e.target.value)}>
            <option value="oldest">Oldest</option>
            <option value="newest">Newest</option>
            <option value="cheapest">Cheapest</option>
            <option value="expensive">Expensive</option>
            <option value="alphabetically">Alphabetically</option>
          </select>
        </div>
        <div className="page-slider__sort-item">
          <p className="page-slider__sort-subtitle">Items on page</p>
          <select className="page-slider__sort-select" onChange={e => handleItem(e.target.value)}>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>
      <Slider ref={sliderRef} {...settings}>
        {shuffledProducts.map(product => (
          <div key={product.id} className="slider__block">
            <ProductCard product={product} showFullPrice={showFullPrice} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
