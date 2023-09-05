/* eslint-disable no-console */
import { useMemo, useState } from 'react';
import { Product } from '../../types/Product';
import { PromoName } from '../../types/PromoName';
import { ProductCard } from '../ProductCard';
import { Button } from '../UI/Button';
import './promo.scss';
import { getProductSlides } from '../../services/getProductSlides';

type Props = {
  name: PromoName;
  products: Product[];
};

export const Promo: React.FC<Props> = ({ name, products }) => {
  const cardHasDiscount = name !== PromoName.BrandNew;
  const [curStep, setCurStep] = useState(0);
  const slides = useMemo(() => {
    return getProductSlides(products);
  }, [products]);

  const changeSlide = (direction: number) => {
    return setCurStep((step) => step + direction);
  };

  return (
    <section className="page__section promo">
      <div className="promo__header">
        <h1 className="promo__title">{name}</h1>
        <div className="promo__controls">
          <Button
            disabled={curStep === 0}
            handleClick={() => changeSlide(-1)}
            imgName="LeftArrow"
          />

          <Button
            disabled={curStep >= slides.length - 1}
            handleClick={() => changeSlide(1)}
            imgName="RightArrow"
          />
        </div>
      </div>

      <div className="promo__screen">
        <div
          data-cy="cardsContainer"
          style={{ transform: `translateX(-${curStep * 100}%)` }}
          className="promo__slider"
        >
          {slides.map(slide => (
            <div
              key={slide.id}
              className="promo__slide"
            >
              {slide.slideProducts.map(product => (
                <ProductCard
                  key={product.id}
                  hasDiscount={cardHasDiscount}
                  product={product}
                />
              ))}
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};
