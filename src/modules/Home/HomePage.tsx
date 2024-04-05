import { useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import { useAppSelector } from '../../store/hooks';
import { Product } from '../../types/Product';
import { Link } from 'react-router-dom';
import { ProductsScroller } from '../shared/ProductsScroller';
import { getCategory } from '../../utils/helpers/helpers';

export const HomePage = () => {
  const [currentPic, setCurrentPic] = useState(1);
  const prevPic = useRef(0);
  const { products } = useAppSelector(state => state.products);

  /* products categorized start */

  const phones = useMemo(() => getCategory(products, 'phones'), [products]);

  const tablets = useMemo(() => getCategory(products, 'tablets'), [products]);

  const accessories = useMemo(() => {
    return getCategory(products, 'accessories');
  }, [products]);

  /* products categorized end */

  /* picture banner start */

  let touchX = 0;
  let isTouchHandled = true;

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isTouchHandled = false;
    touchX = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const newTouchX = e.touches[0].clientX;
    const deltaX = touchX - newTouchX;

    if (!isTouchHandled) {
      if (deltaX >= 200) {
        setCurrentPic(currentPic + 1);

        touchX = newTouchX;
        isTouchHandled = true;
      }

      if (deltaX <= -200) {
        setCurrentPic(currentPic - 1);

        touchX = newTouchX;
        isTouchHandled = true;
      }
    }
  };

  const getPictureClass = (id: number) => {
    const pictureDirectionIn =
      currentPic > prevPic.current ? 'slide-in-right' : 'slide-in-left';

    const pictureDirectionOut =
      pictureDirectionIn === 'slide-in-right'
        ? 'slide-out-left'
        : 'slide-out-right';

    return cn(`banner__img--${id}`, {
      [pictureDirectionIn]: currentPic === id,
      [pictureDirectionOut]:
        // to prevent the initial "out" animation when rendered
        prevPic.current === id && prevPic.current !== currentPic,
    });
  };

  const handleBannerScrolling = () => setCurrentPic(prev => prev + 1);

  const getActiveIndex = (id: number) => {
    return cn('banner__index', {
      'displayed-index': id === currentPic,
    });
  };

  useEffect(() => {
    prevPic.current = currentPic;

    if (currentPic === 4) {
      prevPic.current = 3;
    }

    if (currentPic === 0) {
      prevPic.current = 1;
    }
  }, [currentPic]);

  useEffect(() => {
    if (currentPic === 0) {
      setCurrentPic(3);
    }

    if (currentPic === 4) {
      setCurrentPic(1);
    }
  }, [currentPic]);

  const handleBannerSwipe = (side: 'right' | 'left') => {
    setCurrentPic(prev => {
      if (side === 'right') {
        return prev + 1;
      }

      return prev - 1;
    });
  };

  let intervalId: NodeJS.Timer;

  const handleInterval = () => {
    clearInterval(intervalId);
    intervalId = setInterval(handleBannerScrolling, 5000);
  };

  useEffect(() => {
    handleInterval();

    return () => clearInterval(intervalId);
  }, [handleBannerSwipe]);

  /* picture banner end */

  /* product scroller products start */

  const newPhones = useMemo(() => {
    const toReturn: Product[] = [];

    [...phones]
      .sort((phone1, phone2) => phone2.year - phone1.year)
      .forEach((phone, i) => {
        if (i % 4 === 0) {
          toReturn.push(phone); // we get every 4th phone to get different colors
        }
      });

    return toReturn.slice(0, 10);
  }, [phones]);

  const hotProducts = useMemo(() => {
    const toReturn: Product[] = [];

    const values = [...phones, ...tablets, ...accessories];

    for (let i = 0; i < values.length; i++) {
      toReturn.push(phones[i], tablets[i], accessories[i]);
    }

    return toReturn.slice(25, 35);
  }, [products]);

  /* product scroller products end */

  return (
    <div className="home">
      <h1 className="home__title">Welcome to Nice Gadgets store!</h1>

      <article className="banner">
        <button
          className="banner__button banner__button--left"
          onClick={() => handleBannerSwipe('left')}
        />

        <div
          className="banner__img"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div className={getPictureClass(1)} />

          <div className={getPictureClass(2)} />

          <div className={getPictureClass(3)} />
        </div>

        <button
          className="banner__button banner__button--right"
          onClick={() => handleBannerSwipe('right')}
        />

        <div className="banner__indexes">
          {[1, 2, 3].map(index => (
            <button
              className={getActiveIndex(index)}
              onClick={() => setCurrentPic(index)}
              key={index}
            />
          ))}
        </div>
      </article>

      <ProductsScroller products={newPhones} title="Brand new models" />

      <article className="categories">
        <h2 className="categories__title">Shop by category</h2>

        <div className="categories__categories">
          <div className="categories__category">
            <Link className="categories__img-link" to="/phones">
              <div className="categories__image categories__image--phones" />
            </Link>

            <h3 className="categories__name">Mobile phones</h3>

            <p className="categories__model-count">{phones?.length} models</p>
          </div>

          <div className="categories__category">
            <Link className="categories__img-link" to="/tablets">
              <div className="categories__image categories__image--tablets" />
            </Link>

            <h3 className="categories__name">Tablets</h3>

            <p className="categories__model-count">{tablets?.length} models</p>
          </div>

          <div className="categories__category">
            {/* eslint-disable */}
            <Link className="categories__img-link" to="/accessories">
              <div className="categories__image categories__image--accessories" />
            </Link>
            {/* eslint-enable */}
            <h3 className="categories__name">Accessories</h3>

            <p className="categories__model-count">
              {accessories?.length} models
            </p>
          </div>
        </div>
      </article>

      <ProductsScroller products={hotProducts} title="Hot Prices" />
    </div>
  );
};
