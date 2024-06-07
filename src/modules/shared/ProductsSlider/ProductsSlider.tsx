import './ProductsSlider.scss';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Product } from '../../../types/Product';
import { ProductCard } from '../ProductCard';
import {
  ThemeContext,
  ThemeType,
} from '../../../contexts/ThemeContext/ThemeContext';
import { getIconSrc } from '../../../helpers/getIconSrc';
import classNames from 'classnames';

type Props = {
  products: Product[];
  title: string;
  discount: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  products,
  title,
  discount,
}) => {
  const { theme } = useContext(ThemeContext);
  const [perPage, setPerPage] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(212);

  const changeListWidth = () => {
    const width = window.innerWidth;

    if (width < 640) {
      setCardWidth(212);
      setPerPage(1);
    }

    if (width >= 640 && width < 1200) {
      setCardWidth(237);
      setPerPage(2);
    }

    if (width >= 1200) {
      setCardWidth(272);
      setPerPage(4);
    }
  };

  useEffect(() => {
    changeListWidth();
    window.addEventListener('resize', changeListWidth);

    return () => {
      window.removeEventListener('resize', changeListWidth);
    };
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex(prevIndex =>
      Math.min(prevIndex + 1, products.length - perPage),
    );
  };

  const carouselListStyles = useMemo(
    () => ({
      width: `${(cardWidth + 16) * products.length + 16}px`,
      transform: `translateX(-${currentIndex * (cardWidth + 16)}px)`,
      transition: 'transform 0.5s ease',
    }),
    [cardWidth, products.length, currentIndex],
  );

  return (
    <div className="products-slider">
      <div className="products-slider__top container">
        <h2 className="h2 products-slider__title">{title}</h2>
        <div className="products-slider__buttons">
          <button
            className={classNames('arrowBtn', {
              dark: theme === ThemeType.DARK,
            })}
            onClick={handlePrevClick}
            disabled={currentIndex === 0}
          >
            <img
              src={getIconSrc(
                currentIndex === 0 ? 'arrow-prev-disabled' : 'arrow-prev',
                theme,
              )}
              alt="previous"
              className="icon arrowBtn__icon"
            />
          </button>
          <button
            className={classNames('arrowBtn', {
              dark: theme === ThemeType.DARK,
            })}
            onClick={handleNextClick}
            disabled={currentIndex === products.length - perPage}
          >
            <img
              src={getIconSrc(
                currentIndex === products.length - perPage
                  ? 'arrow-next-disabled'
                  : 'arrow-next',
                theme,
              )}
              alt="next"
              className="icon"
            />
          </button>
        </div>
      </div>

      <div className="products-slider__products">
        <ul className="products-slider__list" style={carouselListStyles}>
          {products.map(product => (
            <li
              className="products-slider__item"
              key={product.id}
              style={{ width: cardWidth }}
            >
              <ProductCard product={product} discount={discount} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
