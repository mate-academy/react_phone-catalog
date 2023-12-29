import './ProductSlider.scss';
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
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
  const CARDS_PER_PAGE = 4;

  const amountOfBlocks = Math.floor(products.length / CARDS_PER_PAGE);
  const firstProductBlock = 0;
  const lastProductBlock = products.length % CARDS_PER_PAGE === 0
    ? amountOfBlocks - 1
    : amountOfBlocks;

  const [currentBlock, setCurrentBlock] = useState(firstProductBlock);

  const isFirstBlock = currentBlock === firstProductBlock;
  const isLastBlock = currentBlock === lastProductBlock;
  const [sliderWidth, setSliderWidth] = useState(0);
  const slider = useRef<HTMLDivElement>(null);
  const productList = useRef<HTMLUListElement>(null);

  const transformValue = isFirstBlock
    ? 0
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
