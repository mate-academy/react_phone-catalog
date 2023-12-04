/* eslint-disable import/no-extraneous-dependencies */
import Slider from 'react-slick';
import { Phone } from '../../Types/Phone';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card } from '../Card/Card';

type Props = {
  products: Phone[],
  discount: boolean,
  title: string,
};

export const ProductCard: React.FC<Props> = ({ products, discount, title }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
  };

  return (
    <>
      <div className="card-container" data-cy="cardsContainer">
        <h1 className="slick-title">{title}</h1>
        <Slider {...settings}>
          {products.map(card => (
            <Card card={card} discount={discount} />
          ))}
        </Slider>
      </div>
    </>
  );
};
