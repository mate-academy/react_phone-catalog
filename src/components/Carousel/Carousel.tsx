import { TechProduct } from '../../types/TechProduct';
import { ProductCard } from '../ProductCard/ProductCard';
import './Carousel.scss';

type Props = {
  movingCarousel: number,
  phones: TechProduct[],
};

export const Carousel: React.FC<Props> = ({
  movingCarousel,
  phones,
}) => {
  return (
    <div className="carousel">
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
