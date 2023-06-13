/* eslint-disable react/jsx-one-expression-per-line */
import {
  RefObject, useEffect, useLayoutEffect, useRef, useState,
} from 'react';
import { Link } from 'react-router-dom';

type Props = {
  productsAmounts: {
    phonesAmount: number,
    tabletsAmount: number,
    accessoriesAmount: number,
  }
};

export const Category: React.FC<Props> = ({ productsAmounts }) => {
  const { phonesAmount, tabletsAmount, accessoriesAmount } = productsAmounts;
  const categories = [
    {
      id: 'phones',
      src: 'img/category/category-phones.png',
      title: 'Mobile phones',
      to: '/phones',
      amount: phonesAmount,
    },
    {
      id: 'tablets',
      src: 'img/category/category-tablets.png',
      title: 'Tablets',
      to: '/tablets',
      amount: tabletsAmount,
    },
    {
      id: 'accessories',
      src: 'img/category/category-accessories.png',
      title: 'Accessories',
      to: '/accessories',
      amount: accessoriesAmount,
    },
  ];

  const staticContainer = useRef() as RefObject<HTMLDivElement>;
  const dynamicContainer = useRef() as RefObject<HTMLDivElement>;
  const [currTransitionX, setCurrTransitionX] = useState(0);
  const [staticContainerWidth, setStaticContainerWidth] = useState(0);
  const [dynamicContainerWidth, setDynamicContainerWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLastImgs, setLastImgs] = useState(false);

  const rightSlide = () => {
    if (currTransitionX + 2 * staticContainerWidth >= dynamicContainerWidth) {
      setCurrTransitionX(
        dynamicContainerWidth - staticContainerWidth,
      );
      setLastImgs(true);
    } else {
      setCurrTransitionX((currValue) => currValue + staticContainerWidth);
    }
  };

  const leftSlide = () => {
    setLastImgs(false);
    if (currTransitionX - staticContainerWidth <= 0) {
      setCurrTransitionX(0);
    } else {
      setCurrTransitionX((currValue) => currValue - staticContainerWidth);
    }
  };

  useLayoutEffect(() => {
    setStaticContainerWidth(staticContainer.current?.clientWidth || 0);
    setDynamicContainerWidth(dynamicContainer.current?.clientWidth || 0);
  });

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    setStaticContainerWidth(staticContainer.current?.clientWidth || 0);

    if (isLastImgs) {
      setCurrTransitionX(
        (dynamicContainer.current?.clientWidth || 0) - staticContainerWidth,
      );
    }

    if (windowWidth >= 660) {
      setCurrTransitionX(0);
    }
  }, [windowWidth]);

  return (
    <section className="home-page__category category">
      <div className="category__container _container">
        <div className="category__header">
          <h2 className="category__title">Shop by category</h2>
          {windowWidth < 660 && (
            <>
              <button
                type="button"
                aria-label="Mute volume"
                className="
                  category__button
                  category__button-left
                  icon-button"
                onClick={leftSlide}
                disabled={currTransitionX === 0}
              />
              <button
                type="button"
                aria-label="Mute volume"
                className="
                  category__button
                  category__button-right
                  icon-button"
                onClick={rightSlide}
                disabled={isLastImgs}
              />
            </>
          )}
        </div>
        <div className="category__static-container" ref={staticContainer}>
          <div
            ref={dynamicContainer}
            className="category__dynamic-container"
            style={{
              transform: `translateX(${-currTransitionX}px)`,
              transitionDuration: '300ms',
            }}
            data-cy="categoryLinksContainer"
          >
            {categories.map(card => (
              <Link key={card.id} className="category__card" to={card.to}>
                <div className={`
                  category__img-container
                  category__img-container--${card.id}`}
                >
                  <img
                    className={`category__img category__img--${card.id}`}
                    src={card.src}
                    alt={card.title}
                  />
                </div>
                <p className="category__card-title">
                  {card.title}
                </p>
                <p className="category__card-amount">
                  {card.amount} model{card.amount > 1 ? 's' : ''}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
