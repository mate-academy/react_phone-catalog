import { useEffect, useRef } from 'react';
import { TechProduct } from '../../types/TechProduct';
import { ProductCard } from '../ProductCard/ProductCard';
import { useContainerDimensions } from '../../helpers/widthCarousel';
import './Carousel.scss';

type Props = {
  movingCarousel: number,
  phones: TechProduct[],
  setWidthCarousel: (width: number) => void,
};

export const Carousel: React.FC<Props> = ({
  movingCarousel,
  phones,
  setWidthCarousel,
}) => {
  const carouselBlock = useRef(null);
  const { width } = useContainerDimensions(carouselBlock);

  useEffect(() => {
    setWidthCarousel(width);
  }, [width]);

  return (
    <div ref={carouselBlock} className="carousel">
      <ul className="carousel__product-list">
        {
          phones.map((phone) => {
            return (
              <li
                className="carousel__product-item"
                key={phone.itemId}
                style={
                  {
                    transform: `translateX(${(-movingCarousel * (272 + 2 + 16))}px)`,
                    transition: '1000ms',
                  }
                }
              >
                <ProductCard
                  product={phone}
                />
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};
