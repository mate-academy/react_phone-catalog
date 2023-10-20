import { useLayoutEffect, useRef, useState } from 'react';
import { Product } from '../../types/Product';
import './ProductSlider.scss';
import { ProductCard } from '../ProductCard';
import { SlideLeftButton } from '../SlideLeftButton';
import { SlideRightButton } from '../SlideRightButton';
import { Loader } from '../Loader';
import { ErrorNotification } from '../ErrorNotification';
import { getCardsPerPage } from '../../helpers/helpers';

type Props = {
  products: Product[],
  title: string,
  isLoading: boolean
  isLoadError: boolean,
};

export const ProductSlider: React.FC<Props> = ({
  products,
  title,
  isLoading,
  isLoadError,
}) => {
  const amountOfBlocks = Math.floor(products.length / getCardsPerPage());
  const firstProductBlock = 0;
  const lastProductBlock = products.length % getCardsPerPage() === 0
    ? amountOfBlocks - 1
    : amountOfBlocks;

  const [
    currentBlock,
    setCurrentBlock,
  ] = useState(firstProductBlock);

  const isFirstBlock = currentBlock === firstProductBlock;
  const isLastBlock = currentBlock === lastProductBlock;
  const [sliderWidth, setSliderWidth] = useState(0);
  const slider = useRef<HTMLDivElement>(null);
  const productList = useRef<HTMLUListElement>(null);

  const transformValue = isFirstBlock
    ? 0
    : (sliderWidth * currentBlock) + (16 * currentBlock);

  useLayoutEffect(() => {
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
    <section className="ProductSlider">
      <div className="ProductSlider__header">
        <h1 className="ProductSlider__header-title">{title}</h1>

        <div className="ProductSlider__header-buttons">
          <SlideLeftButton
            onSlideLeft={handleLeftSlide}
            isDisabled={isFirstBlock}
          />

          <SlideRightButton
            onSlideRight={handleRightSlide}
            isDisabled={isLastBlock}
          />
        </div>
      </div>

      <div className="ProductSlider__content" ref={slider}>
        {isLoading && !isLoadError && <Loader />}
        {isLoadError && <ErrorNotification />}
        {!isLoading && !isLoadError && (
          <ul
            className="ProductSlider__content-list"
            style={{
              transform: `translateX(${-transformValue}px)`,
            }}
            ref={productList}
          >
            {products.map(product => (
              <li
                key={product.id}
                className="ProductSlider__content-list-item"
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
