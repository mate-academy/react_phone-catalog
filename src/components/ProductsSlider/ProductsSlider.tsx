import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductsSlider.scss';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';

type Props = {
  products: Product[];
  type?: string;
};

export const ProductsSlider: React.FC<Props> = ({ products, type }) => {
  const settings = {
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    className: 'slider',
    responsive: [
      {
        breakpoint: 1279,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} data-cy="cardsContainer">
      {products.map(product => (
        <ProductCard
          product={product}
          key={product.id}
          type={type}
        />
      ))}
    </Slider>
  );
};
