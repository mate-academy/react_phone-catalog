import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { Product } from '../../types/Product';
import { ICONS } from '../../icons';
import { Card } from '../Card/Card';
import './ProductsSlider.scss';
import { GlobalContext } from '../../Context/GlobalContext';

type CheckPosition = (
  direction: 'right' | 'left',
) => void;

type Props = {
  sliderTitle: string,
  items: Product[],
  discount: boolean,
};

const ITEM_GAP = 16;
const ITEM_WIDTH = 272;

function getFinalPosition(totalItems: number, frame: number) {
  const fullWidth = totalItems * ITEM_WIDTH + (ITEM_GAP * (totalItems - 1));

  return 0 - (fullWidth - frame);
}

export const ProductsSlider: React.FC<Props> = React.memo(({
  sliderTitle,
  items,
  discount,
}) => {
  const { errorMessage } = useContext(GlobalContext);
  const [scrollProducts, setScrollProducts] = useState(0);
  const [isBtnDisabled, setIsBtnDisabled] = useState<string>('left');
  const [frameWidth, setFrameWidth] = useState(0);
  const finalPosition = getFinalPosition(items.length, frameWidth);
  const elementRef = useRef<HTMLDivElement | null>(null);

  const handleScroll: CheckPosition = (direction) => {
    if (direction === 'right') {
      const scrollRight = scrollProducts + (0 - (frameWidth + ITEM_GAP));

      if (scrollRight < finalPosition) {
        setScrollProducts(finalPosition);
        setIsBtnDisabled('right');
      } else {
        setScrollProducts(scrollRight);
        setIsBtnDisabled('');
        if (scrollRight === finalPosition) {
          setIsBtnDisabled('right');
        }
      }
    }

    if (direction === 'left') {
      const scrollLeft = scrollProducts + frameWidth + ITEM_GAP;

      if (scrollLeft > 0) {
        setScrollProducts(0);
        setIsBtnDisabled('left');
      } else {
        setScrollProducts(scrollLeft);
        setIsBtnDisabled('');
        if (scrollLeft === 0) {
          setIsBtnDisabled('left');
        }
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (elementRef.current) {
        setFrameWidth(elementRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const styles = {
    productsList: {
      transition: 'transform 2000ms ease-in-out',
      transform: `translateX(${scrollProducts}px)`,
    },
  };

  return (
    <>
      <div className="products-slider">
        <div className="products-slider_top">
          <h1 className="products-slider_title page-title-style">
            {sliderTitle}
          </h1>
          <div className="products-slider_btns">
            <button
              type="button"
              className={cn('products-slider_btn page-btns', {
                'products-slider_btn--disabled': isBtnDisabled === 'left',
              })}
              onClick={() => handleScroll('left')}
              disabled={isBtnDisabled === 'left'}
            >
              {isBtnDisabled === 'left' ? (
                <img src={ICONS.arrowLeftDisabled} alt="Scroll left" />
              ) : (
                <img src={ICONS.arrowLeft} alt="Scroll left" />
              )}
            </button>
            <button
              type="button"
              className={cn('products-slider_btn page-btns', {
                'products-slider_btn--disabled': isBtnDisabled === 'right',
              })}
              onClick={() => handleScroll('right')}
              disabled={isBtnDisabled === 'right'}
            >
              {isBtnDisabled === 'right' ? (
                <img src={ICONS.arrowRigntDisabled} alt="Scroll right" />
              ) : (
                <img src={ICONS.arrowRignt} alt="Scroll right" />
              )}
            </button>
          </div>
        </div>
        <div className="products-slider_body">
          {errorMessage ? (
            <div className="phones-page_no-result">
              <h1 className="empty-pages_title page-title-style">
                Unfortunately, products couldn&apos;t be
                <br />
                loaded.
              </h1>
            </div>
          ) : (
            <div className="products-slider_container" ref={elementRef}>
              <div
                className="products-slider_list"
                style={styles.productsList}
              >
                {items.map(product => (
                  <Card item={product} key={product.id} discount={discount} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
});
