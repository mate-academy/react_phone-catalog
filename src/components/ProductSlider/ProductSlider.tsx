import './ProductSlider.scss';
import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  CARDS_AMOUNT_DESKTOP,
  CARDS_AMOUNT_MOBILE,
  CARDS_AMOUNT_TABLET,
  MAX_WIDTH_DESKTOP,
  MAX_WIDTH_MOBILE,
  MAX_WIDTH_TABLET,
} from '../../helpers/vars';
import { Loader } from '../Loader';
import { GlobalContext } from '../../store';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';
import { SliderButtonLeft, SliderButtonRight } from '../SliderButtons';

type Props = {
  title: string,
  products: Product[],
};

export const ProductSlider: React.FC<Props> = ({ title, products }) => {
  const { isLoading } = useContext(GlobalContext);

  const getCardsPerPage = useMemo(() => {
    const windowWidth = window.innerWidth;

    if (windowWidth < MAX_WIDTH_DESKTOP) {
      if (windowWidth < MAX_WIDTH_TABLET) {
        if (windowWidth < MAX_WIDTH_MOBILE) {
          return CARDS_AMOUNT_MOBILE;
        }

        return CARDS_AMOUNT_TABLET;
      }

      return CARDS_AMOUNT_TABLET;
    }

    return CARDS_AMOUNT_DESKTOP;
  }, []);

  const firstProductBlock = 0;
  const amountOfBlocks = Math.floor(products.length / getCardsPerPage);
  const lastProductBlock = products.length % getCardsPerPage === 0
    ? amountOfBlocks - 1
    : amountOfBlocks;

  const [currentBlock, setCurrentBlock] = useState(firstProductBlock);
  const [sliderWidth, setSliderWidth] = useState(0);

  const isFirstBlock = currentBlock === firstProductBlock;
  const isLastBlock = currentBlock === lastProductBlock;

  const slider = useRef<HTMLDivElement>(null);
  const productList = useRef<HTMLUListElement>(null);

  const transformValue = isFirstBlock ? 0
    : (sliderWidth * currentBlock) + (16 * currentBlock);

  useEffect(() => {
    if (slider.current) {
      setSliderWidth(slider.current.offsetWidth);
    }
  }, [currentBlock]);

  const handleLeftSlide = () => {
    if (!isFirstBlock) {
      setCurrentBlock(currentBlock - 1);
    }
  };

  const handleRightSlide = () => {
    if (!isLastBlock) {
      setCurrentBlock(currentBlock + 1);
    }
  };

  return (
    <section className="product-slider">
      <div className="product-slider__header">
        <h1 className="product-slider__header-title">{title}</h1>

        <div className="product-slider__header-buttons">
          <SliderButtonLeft
            onSlideLeft={handleLeftSlide}
            isDisabled={isFirstBlock}
          />
          <SliderButtonRight
            onSlideRight={handleRightSlide}
            isDisabled={isLastBlock}
          />
        </div>
      </div>

      <div className="product-slider__content" ref={slider}>
        {isLoading ? <Loader /> : (
          <ul
            ref={productList}
            className="product-slider__content-list"
            style={{ transform: `translateX(${-transformValue}px)` }}
          >
            {products.map(product => (
              <li
                key={product.id}
                className="product-slider__content-list-item"
              >
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
