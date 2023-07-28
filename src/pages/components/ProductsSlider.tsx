// import { ProductCard } from './ProductCard';
import {
  FC, cloneElement, useEffect, useState,
} from 'react';
import '../../styles/styles.scss';

type Props = {
  children: JSX.Element[];
};

const PICTURE_SIZE = 272 + 16; // 272px cardsize + 16px gap between product-cards
const VISIBLE_SIZE_ROW = 1136; // 1136px visible length of Home-page;

export const ProductsSlider: FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<JSX.Element[]>([]);
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
    console.log('handleLeftClick')
  }

  function handleRightClick() {
    setOffset((prevOffset) => {
      const newOffset = prevOffset - PICTURE_SIZE;

      if (newOffset < -((PICTURE_SIZE * products.length) - VISIBLE_SIZE_ROW)) {
        return prevOffset;
      }

      return newOffset;
    });
    console.log('handleRightClick')
  }

  useEffect(() => {
    setProducts((prev) => {
      return prev.map((child) => {
        return cloneElement(child, {
          key: child.key,
          style: {
            transition: '500ms',
            transform: `translateX(${offset}px)`,
          },
        });
      });
    });
  }, [offset]);

  useEffect(() => {
    setProducts(children);
  }, [children]);
  console.log(products)

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
        {products}
      </div>
    </div>
  );
};
