import './ProductsSlider.scss';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/product';
import {
  cardsDesktop,
  cardsMobile,
  cardsTablet,
  maxWidthDesktop,
  maxWidthMobile,
  maxWidthTablet,
} from '../../helpers/vars';

type Props = {
  title: string;
  products: Product[];
};

export const ProductSlider: React.FC<Props> = ({ title, products }) => {
  const cardsPerPage = useMemo(() => {
    const windWidth = window.innerWidth;

    if (windWidth < maxWidthDesktop) {
      if (windWidth < maxWidthTablet) {
        if (windWidth < maxWidthMobile) {
          return cardsMobile;
        }

        return cardsTablet;
      }

      return cardsTablet;
    }

    return cardsDesktop;
  }, []);

  const gap = 16;

  const numberOfBlocks = Math.floor(products.length / cardsPerPage);
  const firstBlock = 0;
  const lastBlock =
    products.length % cardsPerPage === 0 ? numberOfBlocks - 1 : numberOfBlocks;

  const [currentBlock, setCurrentBlock] = useState(firstBlock);
  const [sliderWidth, setSliderWidth] = useState(0);

  const isFirstBlock = currentBlock === firstBlock;
  const isLastBlock = currentBlock === lastBlock;

  const slider = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);

  const transform = isFirstBlock
    ? 0
    : sliderWidth * currentBlock + gap * currentBlock;

  useEffect(() => {
    if (slider.current) {
      setSliderWidth(slider.current.offsetWidth);
    }
  }, [currentBlock]);

  const onLeftMove = () => {
    if (!isFirstBlock) {
      setCurrentBlock(currentBlock - 1);
    }
  };

  const onRightMove = () => {
    if (!isLastBlock) {
      setCurrentBlock(currentBlock + 1);
    }
  };

  return (
    <section className="product-slider">
      <div className="product-slider__header">
        <h2 className="product-slider__header-title">{title}</h2>

        <div className="product-slider__header-buttons">
          <button className="left-slide" onClick={onLeftMove}>
            <div
              className={
                isFirstBlock ? 'icon icon-left-disabled' : 'icon icon-left'
              }
            />
          </button>
          <button className="right-slide" onClick={onRightMove}>
            <div
              className={
                isLastBlock ? 'icon icon-right-disabled' : 'icon icon-right'
              }
            />
          </button>
        </div>
      </div>

      <div className="product-slider__content" ref={slider}>
        <ul
          ref={list}
          className="product-slider__content-list"
          style={{
            transform: `translateX(-${transform}px)`,
          }}
        >
          {products.map(product => (
            <li key={product.id} className="product-slider__content-list-item">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
