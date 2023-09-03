import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Loader } from './Loader';
import { Product } from './types/Product';
import { ProductCard } from './ProductCard';
import { getProducts } from './api/products';

type Props = {
  pathname: string,
  title: string,
  dicount: boolean,
  random: boolean,
};

export const ProductsSlider: React.FC<Props> = ({
  pathname,
  title,
  dicount,
  random,
}) => {
  const [position, setPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [products, setProducts] = useState<Product[] | []>([]);
  const cardWidth = 275;
  const gap = 25;
  const cardsPerPage = 4;
  const step = (cardWidth + gap) * cardsPerPage;
  const frameSize = (cardWidth * cardsPerPage) + (gap * cardsPerPage - 1);
  const productCardsLength = (
    cardWidth * products.length) + (gap * (products.length - 1)
  );

  const getSuggestedProducts = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await getProducts();

      if (dicount && !random) {
        setProducts([...response as Product[]].filter(
          product => product.discount > 0,
        ).sort(
          (prevProduct, currProduct) => (
            currProduct.price
            - (currProduct.price * currProduct.discount) / 100)
            - (prevProduct.price
              - (prevProduct.price * prevProduct.discount) / 100),
        ));
      }

      if (!dicount && !random) {
        setProducts([...response as Product[]].filter(
          product => product.discount <= 0,
        ).sort(
          (prevProduct, currProduct) => (
            currProduct.price - prevProduct.price),
        ));
      }

      if (!dicount && random) {
        const randomProducts: Product[] = [];
        const arrayLength = (response as Product[]).length;
        const values = [...Array(arrayLength)].map((_, i) => i);
        const result = [...Array(arrayLength)].map(
          () => values.splice(Math.floor(Math.random() * values.length), 1)[0],
        );

        result.map(
          number => randomProducts.push((response as Product[])[number]),
        );

        setProducts(randomProducts);
      }
    } catch {
      setIsError(false);
    } finally {
      setIsLoading(false);
    }
  };

  const moveRight = () => {
    if (frameSize < productCardsLength) {
      const currentPosition = position - step;

      if (currentPosition - step <= -productCardsLength) {
        setPosition(-productCardsLength + frameSize);
      }

      setPosition(currentPosition);
    }
  };

  const moveLeft = () => {
    setPosition(position + step);
  };

  useEffect(() => {
    getSuggestedProducts();
  }, [pathname]);

  return (
    <div className="slider slider--phones">
      <div className="slider__content">
        <div className="slider__top">
          <h2 className="slider__subtitle">{title}</h2>
          <div className="slider__button_container">
            <button
              type="button"
              aria-label="Left scroll"
              className={classNames(
                'slider__button slider__button--phones',
                { 'slider__button--disabled': position > -1 },
              )}
              disabled={position > -1}
              onClick={moveLeft}
            />
            <button
              type="button"
              aria-label="Right scroll"
              className={classNames(
                'slider__button slider__button--phones',
                {
                  'slider__button--disabled':
                  position - step < -productCardsLength,
                },
              )}
              disabled={position - step < -productCardsLength}
              onClick={moveRight}
            />
          </div>
        </div>

        {isLoading && (
          <Loader />
        )}

        {isError && (
          <p>No phones</p>
        )}

        <div className="slider__container">
          <div
            className="slider__photos slider__photos--phones"
            style={{ transform: `translate(${position}px, 0)`, transition: 'transform 1.2s' }}
          >
            {(!isLoading && !isError) && (
              products.map(product => (
                <ProductCard product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
