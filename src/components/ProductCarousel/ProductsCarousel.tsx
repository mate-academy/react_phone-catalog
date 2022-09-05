import './ProductsCarousel.scss';
import { FC, useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { Arrow } from '../Buttons/Arrow/Arrow';
import { ArrowTypes } from '../../ArrowTypes';

type Props = {
  products: Product[],
};

const slideDuration = 600;
const itemWidth = 506;

export const ProductsCarousel: FC<Props> = (props) => {
  const { products } = props;

  const [currentPosition, setCurrentPosition] = useState(0);

  const maxPosTransform = (products.length - 1) * itemWidth;

  const moveCarousel = (moveNext: boolean) => {
    let needMove = moveNext
      ? currentPosition + itemWidth
      : currentPosition - itemWidth;

    if (needMove >= maxPosTransform) {
      needMove = maxPosTransform;
    }

    if (needMove < 0 || currentPosition === maxPosTransform) {
      needMove = 0;
    }

    setCurrentPosition(needMove);
  };

  return (
    <div className="products-carousel">
      <div className="products-carousel__top">
        <h2 className="section-title">Hot prices</h2>

        <div className="products-carousel__control">
          <Arrow
            arrowType={ArrowTypes.left}
            isActive={currentPosition !== 0}
            OnClick={() => moveCarousel(false)}
          />

          <Arrow
            arrowType={ArrowTypes.right}
            isActive={currentPosition < maxPosTransform}
            OnClick={() => moveCarousel(true)}
          />
        </div>
      </div>

      <div className="products-carousel__items">
        <ul
          className="products-carousel__list"
          style={{
            transition: `transform ${slideDuration}ms`,
            transform: `translateX(-${currentPosition}px)`,
          }}
        >
          {products.map((product) => {
            const {
              name,
              imageUrl,
              price,
              discount,
              screen,
              capacity,
              ram,
              id,
            } = product;

            return (
              <li key={id}>
                <ProductCard
                  title={name}
                  image={imageUrl}
                  price={price}
                  discount={discount}
                  screen={screen}
                  capacity={capacity}
                  ram={ram}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
