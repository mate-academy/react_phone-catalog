// import { ProductCard } from './ProductCard';
import {
  FC, useEffect, useState,
} from 'react';
import '../../styles/styles.scss';
import { Product } from '../../types/Product';
import { ProductCard } from './ProductCard';

type Props = {
  phones: Product[];
};

const PICTURE_SIZE = 288; // 272px cardsize + 16px gap between product-cards
const VISIBLE_SIZE_ROW = 1136; // 1136px visible length of Home-page;

export const ProductsSlider: FC<Props> = ({ phones }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [offset, setOffset] = useState(0);

  function handleLeftClick() {
    setOffset((prevOffset) => {
      const newOffset = prevOffset + PICTURE_SIZE;
      const minOffset = 0;

      if (newOffset > 0) {
        return minOffset;
      }

      return newOffset;
    });
  }

  function handleRightClick() {
    setOffset((prevOffset) => {
      const newOffset = prevOffset - PICTURE_SIZE;

      if (newOffset < -((PICTURE_SIZE * products.length) - VISIBLE_SIZE_ROW)) {
        return prevOffset;
      }

      return newOffset;
    });
  }

  useEffect(() => {
    setProducts(phones);
  }, [phones]);

  return (
    <div className="products-slider">
      <div className="products-slider__container-buttons">
        <button
          className="products-slider__buttons"
          type="button"
          onClick={handleLeftClick}
        >
          <img src="images/icons/ArrowLeft.svg" alt="" />
        </button>
        <button
          className="products-slider__buttons"
          type="button"
          onClick={handleRightClick}
        >
          <img src="images/icons/ArrowRight.svg" alt="" />
        </button>
      </div>
      <div className="products-slider__container-products">
        {products.map(product => (
          <div
            key={product.id}
            style={{
              transition: '500ms',
              transform: `translateX(${offset}px)`,
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
