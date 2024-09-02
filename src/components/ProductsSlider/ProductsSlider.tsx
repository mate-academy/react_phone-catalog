import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductsSlider.scss';
import { ProductCard } from '../ProductCard';
import { Product, ProductDetailed } from '../../types/types';
import { Loader } from '../Loader';

type Props = {
  goods: Product[] | ProductDetailed[];
  isLoading: boolean;
};

export const ProductSlider: React.FC<Props> = ({ goods, isLoading }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {goods.length > 0 && (
        <div className="slider-container">
          <Slider {...settings}>
            {goods.map(good => (
              <div key={good.id} className="slider-item">
                <ProductCard product={good} />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};
