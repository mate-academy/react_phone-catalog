/* eslint-disable no-mixed-operators */
import cn from 'classnames';
import './ProductSlider.scss';
import '../../styles/utils/variables.scss';
import { useEffect, useState } from 'react';
import { Product } from '../../types/product';
import { ProductCard } from '../ProductCard/ProductCard';
import { Cart } from '../../types/cart';

type Props = {
  products: Product[];
  title: string;
  handleSetCarts: (value:Product) => void;
  carts:Cart[];
  handleSetFavorites: (calue: Product) => void;
  favorites:Product[];
};

const ActiveButtonLeft = (moveLeft: number) => cn(
  'button-navigation ',
  { 'button-navigation--disabled': moveLeft === 0 },
);

const ActiveButtonRight = (
  moveLeft: number, products: Product[], cardWidth: number,
) => cn(
  'button-navigation ',
  {
    'button-navigation--disabled': moveLeft
    === (products.length - 4) * -cardWidth,
  },
);

export const ProductSlider: React.FC<Props> = ({
  products, title, handleSetCarts, carts, handleSetFavorites, favorites,
}) => {
  const [moveLeft, setMoveLeft] = useState(0);

  const cardWidth = 288;

  useEffect(() => {
    if (moveLeft > 0) {
      setMoveLeft(0);
    } else if (moveLeft < (products.length - 4) * -cardWidth) {
      setMoveLeft((products.length - 4) * -cardWidth);
    }
  }, [moveLeft]);

  return (
    <>
      <div className="title-container">
        <h1 className="title">{title}</h1>
        <div className="button-container">
          <button
            className={ActiveButtonLeft(moveLeft)}
            type="button"
            onClick={() => {
              setMoveLeft(moveLeft + 288);
            }}
            disabled={moveLeft === 0}
          >
            <img
              className={moveLeft !== 0 ? 'img' : ''}
              src="./img/icons/arrowleft.svg"
              alt="#move-left"
            />
          </button>
          <button
            className={ActiveButtonRight(moveLeft, products, cardWidth)}
            type="button"
            onClick={() => {
              setMoveLeft(moveLeft - 288);
            }}
            disabled={moveLeft === (products.length - 4) * -cardWidth}
          >
            <img
              className={moveLeft !== (products.length - 4) * -cardWidth
                ? 'img' : ''}
              src="./img/icons/arrowright.svg"
              alt="#move-right"
            />
          </button>
        </div>
      </div>

      <div className="card-container home-page-container__card-container">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            moveLeft={moveLeft}
            handleSetCarts={handleSetCarts}
            carts={carts}
            handleSetFavorites={handleSetFavorites}
            favorites={favorites}
          />
        ))}
      </div>
    </>
  );
};
