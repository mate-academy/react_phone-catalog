import { useRef } from 'react';
import Slider from 'react-slick';
import SquareButton from './SquareButton';
import { ReactComponent as RightArrow }
  from '../assets/images/icons/arrow-right.svg';
import { ReactComponent as LefttArrow }
  from '../assets/images/icons/arrow-left.svg';
import { Product } from '../types/Product';
import ProductCard from './ProductCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type Props = {
  list: Product[];
  title: string;
};

const ProductSlider: React.FC<Props> = ({ list, title }) => {
  const sliderRef = useRef<Slider | null>(null);

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const settings = {
    className: 'centerSlider',
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1180,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 880,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 625,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="sliderList">
      <div className="sliderList__topContainer">
        <h1 className="page__section-title">
          {title}
        </h1>
        <div className="sliderList__btnContainer">
          <SquareButton
            classModificator="sliderList__btn"
            OnClick={previous}
          >
            <LefttArrow />
          </SquareButton>
          <SquareButton
            classModificator="sliderList__btn"
            OnClick={next}
          >
            <RightArrow />
          </SquareButton>
        </div>
      </div>
      <Slider ref={sliderRef} {...settings}>

        {list.map(product => (
          <div
            className="sliderList__item"
            key={product.id}
          >
            <ProductCard product={product} />
          </div>
        ))}

      </Slider>

      {/* {
        <ul style={{ transform: `translateX(-${slidIndex * 288}px)` }} className="sliderList__list">
          {productList.map(product => (
            <li key={product.id} className="sliderList__item">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      } */}
    </div>
  );
};

export default ProductSlider;
