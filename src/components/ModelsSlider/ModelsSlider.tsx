import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './ModelsSlider.module.scss';
import { ProductCard } from '../ProductCard';
import { ArrowClassType, CustomArrow } from '../CustomArrow';
import { Product } from '../../types/Product';

type Props = {
  arrowClassName: ArrowClassType;
  products: Product[];
};

export const ModelsSlider = ({ arrowClassName, products }: Props) => {
  const settings: Settings = {
    speed: 500,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    // adaptiveHeight: true,
    adaptiveHeight: false,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
    nextArrow: (
      <CustomArrow direction="right" arrowClassName={arrowClassName} />
    ),
    prevArrow: <CustomArrow direction="left" arrowClassName={arrowClassName} />,
  };

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Slider>
    </div>
  );
};
