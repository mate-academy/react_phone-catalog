import { useSelector } from 'react-redux';
import themeStyles from '../../../styles/utils/themeStyles';
import '../Slider/Slider.scss';
import { Category } from '../../../types/category';
import { SliderTitle } from '../../../types/sliderTitle';
import { RootState } from '../../../app/store';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { ScreenSize } from '../../../types/screenSize';
import { ProductItem } from '../../ProductItem';
import { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { useSwipe } from '../../../hooks/useSwipe';
import { useFilteredProducts } from '../../../hooks/useFilteredProducts';
import { ProductItemLoader } from '../../ProductItem/ProductItemLoader';
import { getSuggestedProducts } from '../../../utils/getSuggestedProducts';
import { Product } from '../../../types/product';

type Props = {
  title: SliderTitle;
  category: Category;
};

export const Slider: React.FC<Props> = ({ title, category }) => {
  const isMobile = useMediaQuery(ScreenSize.Mobile);
  const isDesktop = useMediaQuery(ScreenSize.Desktop);

  const Header = isMobile ? 'h3' : 'h2';

  const [scrollIndex, setScrollIndex] = useState(0);
  const [leftButtonIsActive, setLeftButtonIsActive] = useState(false);
  const [rightButtonIsActive, setRightButtonIsActive] = useState(true);
  const [filteredProductsLength, setFilteredProductsLength] = useState(0);
  const suggestedProductsRef = useRef<Product[]>([]);

  const currentTheme = useSelector(
    (state: RootState) => state.currentTheme.theme,
  );

  const { arrow, disabledArrow } = themeStyles(currentTheme === 'light-theme');

  const { products, status } = useFilteredProducts(category);

  // Calculates the width of the block including gap and multiplies by a number depending on screen size
  const scrollBlocks = isMobile ? 1 : isDesktop ? 4 : 2;
  const visibleWidth = () => {
    let result = 0;

    if (isMobile) {
      result = 228;
    } else {
      result = 253;
    }

    if (isDesktop) {
      result = 288;
    }

    return result * scrollBlocks;
  };

  const handlePrevItem = () => {
    if (scrollIndex > 0) {
      setScrollIndex(current => current - 1);
      setRightButtonIsActive(true); // Reactivate right button
    }

    if (scrollIndex <= 1) {
      setLeftButtonIsActive(false); // Disable left button if at the start
    }
  };

  const handleNextItem = () => {
    if (scrollIndex < filteredProductsLength) {
      setScrollIndex(current => current + 1);
      setLeftButtonIsActive(true); // Reactivate left button
    }

    if (
      scrollIndex >= Math.floor((filteredProductsLength - 2) / scrollBlocks)
    ) {
      setRightButtonIsActive(false); // Disable right button at end
    }
  };

  // Swipe for touch devices
  const canDoubleScrollLeft = () => scrollIndex > 1;
  const canDoubleScrollRight = () =>
    scrollIndex <
    Math.floor((filteredProductsLength - 2 - scrollBlocks) / scrollBlocks);

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe(
    () => {
      if (leftButtonIsActive && status === 'succeeded') {
        handlePrevItem();
      }
    },
    () => {
      if (rightButtonIsActive && status === 'succeeded') {
        handleNextItem();
      }
    },
    canDoubleScrollLeft,
    canDoubleScrollRight,
  );

  useEffect(() => {
    if (suggestedProductsRef.current.length === 0 && products.length > 0) {
      suggestedProductsRef.current = getSuggestedProducts(products, 10);
    }
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    switch (title) {
      case 'Brand new models':
      case 'Hot prices':
        const newest = Math.max(...filtered.map(product => product.year));

        filtered = filtered.filter(product => product.year === newest);

        if (title === 'Hot prices') {
          filtered.sort(
            (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
          );
        }

        break;
      case 'You may also like':
        if (suggestedProductsRef.current.length > 0) {
          filtered = suggestedProductsRef.current;
        }

        break;
      default:
        break;
    }

    return filtered;
  }, [title, products]);

  useEffect(() => {
    setFilteredProductsLength(filteredProducts.length);
  }, [filteredProducts.length]);

  return (
    <section className="slider">
      <div className="slider__top">
        <div className="slider__top-title">
          <Header>{title}</Header>
        </div>

        <div className="slider__top-buttons">
          <button
            className={classNames('arrow-button', {
              disabled: !leftButtonIsActive,
            })}
            onClick={handlePrevItem}
          >
            <img
              src={leftButtonIsActive ? arrow : disabledArrow}
              alt="Left button"
              className="icon icon-left"
            />
          </button>

          <button
            className={classNames('arrow-button', {
              disabled: !rightButtonIsActive,
            })}
            onClick={() => {
              if (rightButtonIsActive) {
                handleNextItem();
              }
            }}
            disabled={status !== 'succeeded'}
          >
            <img
              src={rightButtonIsActive ? arrow : disabledArrow}
              alt="Right button"
              className="icon"
            />
          </button>
        </div>
      </div>

      <div
        className="slider__main"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="slider__main-container"
          style={{
            transform: `translateX(-${scrollIndex * visibleWidth()}px)`,
          }}
        >
          {status === 'loading' &&
            Array.from({ length: 5 }).map((_, index) => (
              <ProductItemLoader key={index} />
            ))}

          {status === 'succeeded' &&
            filteredProducts.map(item => (
              <ProductItem
                key={item.id}
                itemData={item}
                showFullPrice={title === 'Hot prices'}
              />
            ))}
        </div>
      </div>
    </section>
  );
};
