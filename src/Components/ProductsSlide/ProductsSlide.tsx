import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { getBrandNewProducts, getHotPriceProducts } from '../../helper/api';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductSlide.scss';
import { ProductContext } from '../../helper/ProductContext';

interface Props {
  sectionType: 'hotPrices' | 'brandNew' | 'alsoLike';
}

export const ProductsSlide: React.FC<Props> = ({ sectionType }) => {
  const { product, setProduct } = useContext(ProductContext);
  const [scrollPosition, setScrollPosition] = useState(0);

  const sliderWidth = document.querySelector('.slider')?.clientWidth || 0;
  const cardWidth = document.querySelector('.card')?.clientWidth || 0;

  const maxScrol =
    cardWidth && sliderWidth && product.length * cardWidth - sliderWidth;

  const scrollRight = () => {
    const newPosition = scrollPosition - sliderWidth;

    setScrollPosition(newPosition + 8);
  };

  const scrollLeft = () => {
    const newPosition = scrollPosition + sliderWidth;

    setScrollPosition(newPosition + 16);
  };

  useEffect(() => {
    if (sectionType === 'hotPrices' || sectionType === 'alsoLike') {
      getHotPriceProducts().then(response => {
        setProduct(response);
      });
    }

    if (sectionType === 'brandNew') {
      getBrandNewProducts().then(response => {
        setProduct(response);
      });
    }

    const element = document.querySelector(
      `.${sectionType}Container`,
    ) as HTMLElement;

    element.style.transform = `translate(-${scrollPosition}px)`;
  }, [scrollPosition, sectionType, setProduct]);

  return (
    <div className="slider">
      <div className="slider__items">
        <h1 className="slider__title">
          {' '}
          {sectionType === 'alsoLike' && 'You may also like'}
          {sectionType === 'hotPrices' && 'Hot prices'}
          {sectionType == 'brandNew' && 'Brand new'}
        </h1>
        <div className="slider__buttons">
          <button
            className="slider__button slider__button--right"
            onClick={scrollRight}
            disabled={scrollPosition === 0}
          >
            <i
              className={`slider__img slider__img--right ${scrollPosition === 0 ? 'disabled' : ''}`}
            />
          </button>
          <button
            className="slider__button slider__button--left"
            onClick={scrollLeft}
            disabled={scrollPosition > maxScrol}
          >
            <i
              className={`slider__img slider__img--left ${maxScrol && scrollPosition > maxScrol ? 'disabled' : ''}`}
            />
          </button>
        </div>
      </div>

      <div
        className={classNames('cardsContainer', {
          hotPricesContainer: sectionType === 'hotPrices',
          brandNewContainer: sectionType === 'brandNew',
          alsoLikeContainer: sectionType === 'alsoLike',
        })}
      >
        {product.map(prod => (
          <ProductCard product={prod} sectionType={sectionType} key={prod.id} />
        ))}
      </div>
    </div>
  );
};
