import { memo, useContext, useEffect, useState } from 'react';
import { ProductCard } from '../../../shared/components/ProductCard';
import { Product } from '../../../shared/components/types/Product';
import classNames from 'classnames';

import './ProductsSlider.scss';
import '../../../shared/styles/Arrow-btn.scss';
import { SwippingWrapper } from '../../../shared/components/SwippingWrapper';
import { useLocation } from 'react-router-dom';
import { StateContext } from '../../../utils/GlobalStateProvider';

const getCardWidth = () => {
  return window.innerWidth > 640 ? (window.innerWidth > 1200 ? 272 : 237) : 215;
};

type Props = {
  title: string;
  products: Product[];
  name: string;
  enableDiscount?: boolean;
  isLoading: boolean;
};

// eslint-disable-next-line react/display-name
export const ProductsSlider: React.FC<Props> = memo(
  ({ title, name, products, isLoading, enableDiscount = false }) => {
    const { isDarkThemeOn } = useContext(StateContext);
    const [step, setStep] = useState(0);
    const [cardWidth, setCardWidth] = useState(getCardWidth);
    const { pathname } = useLocation();
    const productName = pathname.split('/')[2] || '';

    const gap = 16;
    const cardCountOnFrame = Math.floor(window.innerWidth / cardWidth);
    const frameLimit = cardCountOnFrame > 4 ? 4 : cardCountOnFrame;
    const needToTransform =
      step < products.length - frameLimit
        ? -step * (cardWidth + gap)
        : -step * (cardWidth + gap) +
          (window.innerWidth - cardWidth * frameLimit - gap * (frameLimit + 1));

    const arrowStyle = isDarkThemeOn
      ? 'arrow-btn'
      : 'arrow-btn arrow-btn--dark';
    const arrowStyleActive = isDarkThemeOn
      ? 'arrow-btn--active'
      : 'arrow-btn--dark-active';

    const handleStepChange = (newStep: number) => {
      if (
        newStep < 0 ||
        newStep > products.length - frameLimit - (frameLimit === 4 ? 1 : 0)
      ) {
        return;
      }

      setStep(newStep);
    };

    useEffect(() => {
      const handleResize = () => {
        setCardWidth(getCardWidth);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return (
      <section key={name} id={name} className="product-slider">
        <div className="product-slider__title-wrapper">
          <h2 className="product-slider__title">{title}</h2>

          <div className="product-slider__btns">
            <button
              className={classNames(arrowStyle, 'arrow-btn--left', {
                [arrowStyleActive]: step === 0,
              })}
              onClick={() => handleStepChange(step - 1)}
            ></button>
            <button
              className={classNames(arrowStyle, 'arrow-btn--right', {
                [arrowStyleActive]: step === products.length - frameLimit,
              })}
              onClick={() => handleStepChange(step + 1)}
            ></button>
          </div>
        </div>

        <SwippingWrapper
          handleChangeSlidePosition={handleStepChange}
          slidePosition={step}
        >
          <div className="product-slider__cards">
            {products
              .filter(product => product.itemId !== productName)
              .map(product => (
                <ProductCard
                  isLoading={isLoading}
                  key={product.id}
                  needToMove={needToTransform}
                  product={product}
                  enableDiscount={enableDiscount}
                  width={cardWidth}
                />
              ))}
          </div>
        </SwippingWrapper>
      </section>
    );
  },
);
