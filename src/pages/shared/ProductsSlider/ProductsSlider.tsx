import './ProductsSlider.scss';
import classNames from 'classnames';
import {
  useState,
  useContext,
  useMemo,
  useCallback,
  FC,
  useEffect,
} from 'react';
import { Product } from '../../../types/Product';
import { ProductCard } from '../ProductCard';
import { Icon } from '../Icon';
import { icons } from '../../../constants/iconsObject';
import { GlobalContext } from '../../../context/GlobalContext';

type Props = {
  title: string;
  products: Product[];
  displayType: 'fullPrice' | 'with-discount';
};

export const ProductsSlider: FC<Props> = ({ title, products, displayType }) => {
  const { theme } = useContext(GlobalContext);
  const [cardWidth, setCardWidth] = useState(272);
  const gap = 16;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const updateCardWidth = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 640) {
        setCardWidth(212);
      } else if (screenWidth < 1200) {
        setCardWidth(237);
      } else {
        setCardWidth(272);
      }
    };

    window.addEventListener('resize', updateCardWidth);

    return () => {
      window.removeEventListener('resize', updateCardWidth);
    };
  }, []);

  const maxIndex = useMemo(() => {
    const maxCardsInTrack = 4;

    return products.length - maxCardsInTrack;
  }, [products.length]);

  const handleNext = useCallback(() => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, maxIndex]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  return (
    <div className="productsSlider">
      <div className="productsSlider__container-top">
        <h2 className="productsSlider__title">{title}</h2>
        <div className="productsSlider__buttons">
          <div
            className={classNames('productsSlider__button', {
              'productsSlider__button--disabled': currentIndex === 0,
            })}
            onClick={handlePrev}
          >
            {currentIndex === 0 ? (
              <Icon icon={icons.arrow_left__disabled[theme]} />
            ) : (
              <Icon icon={icons.arrow_left[theme]} />
            )}
          </div>
          <div
            className={classNames('productsSlider__button', {
              'productsSlider__button--disabled': currentIndex === maxIndex,
            })}
            onClick={handleNext}
          >
            {currentIndex === maxIndex ? (
              <Icon icon={icons.arrow_right__disabled[theme]} />
            ) : (
              <Icon icon={icons.arrow_right[theme]} />
            )}
          </div>
        </div>
      </div>

      <div className="productsSlider__viewport">
        <div
          className="productsSlider__track"
          style={{
            transform: `translateX(-${currentIndex * (cardWidth + gap)}px)`,
          }}
        >
          {products.map(phone => (
            <div
              key={phone.id}
              className="productsSlider__item"
              style={{ width: `${cardWidth}px` }}
            >
              <ProductCard product={phone} displayType={displayType} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
