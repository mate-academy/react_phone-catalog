import { useRef } from 'react';
import Slider from 'react-slick';
import { Product } from '../../types/Product';
import { ReactComponent as ArrowLeft } from '../../img/icons/VectorLeft.svg';
import { ReactComponent as ArrowRight } from '../../img/icons/VectorRight.svg';
import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[];
  title: string;
};

export const ReactSlider: React.FC<Props> = ({ products, title }) => {
  const sliderRef = useRef<Slider | null>(null);

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1216,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 880,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 610,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <nav className="level is-mobile">
        <div className="level-left">
          <div className="level-item">
            <h1 className="title has-text-weight-bold">{title}</h1>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <button
              type="button"
              className="button is-small"
              onClick={previous}
            >
              <ArrowLeft />
            </button>

          </div>
          <div className="level-item">
            <button
              type="button"
              className="button is-small"
              onClick={next}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </nav>

      <Slider className="hello" ref={sliderRef} {...settings}>

        {products.map(product => (
          <ProductCard product={product} />
        ))}

      </Slider>
    </div>
  );
};
