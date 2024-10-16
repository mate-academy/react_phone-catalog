import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ProductCard } from '../ProductCard/ProductCard';

import { Product } from '../../../types/Product';

interface ProductSliderProps {
  products: Product[];
  showFullPrice: boolean;
}

export const SliderProductCard: React.FC<ProductSliderProps> = ({ products }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    variableWidth: true,

    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 1,
    //     },
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  };

  return (
    <div className="slider-productcard__container">
      <Slider {...settings}>
        {products.map(product => (
          <div key={product.id} className="slider__block">
            <ProductCard product={product} showFullPrice={false} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
