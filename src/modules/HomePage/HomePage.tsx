import React, { useCallback, useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
import clsx from 'clsx';
import { useWindowWidth } from '../../hooks/WindowWidth';
import classNames from 'classnames';
import { Article } from '../../shared/types/Article';
import { getDataPublic } from '../../shared/functions/functions';
import { Carousel } from '../../shared/Carousel/Carousel';
import { HotPrices } from './components/HotPrices';
import { Categories } from './components/Categories';

const pcImages = [
  '/img/banners/banner_1.svg',
  '/img/banners/banner_2.png',
  '/img/banners/banner_3.png',
];

const phoneImages = [
  '/img/banners/banner_1_phone.svg',
  '/img/banners/banner_2_phone.png',
  '/img/banners/banner_3_phone.png',
];

export const HomePage: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const windowWidth = useWindowWidth();
  const [newModels, setNewModels] = useState<Article[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const visibleImages = windowWidth < 640 ? phoneImages : pcImages;

  useEffect(() => {
    getDataPublic('products')
      .then((response: Article[]) => {
        const filtered = response.filter(
          (el: Article) =>
            el.year === 2022 && el.price > 1000 && el.price < 1200,
        );

        setNewModels(filtered);
      })
      .catch(() => setError('problem with new models filter'));
  }, []);

  useEffect(() => {
    setIndex(0);
  }, [visibleImages]);

  const nextImage = useCallback(() => {
    setIndex(prev => (prev + 1) % visibleImages.length);
  }, [visibleImages.length]);

  const prevImage = useCallback(() => {
    setIndex(prev => (prev - 1 + visibleImages.length) % visibleImages.length);
  }, [visibleImages.length]);

  useEffect(() => {
    if (error) {
      return;
    }
  }, [error]);

  return (
    <>
      <header id="home" className={styles.home}>
        <h1 className={styles.home__title}>Welcome to Nice Gadgets store!</h1>

        {windowWidth > 640 && (
          <>
            <button
              className={classNames(styles.slideButton, styles.buttonLeft)}
              onClick={prevImage}
            >
              {'<'}
            </button>
            <button
              className={classNames(styles.slideButton, styles.buttonRight)}
              onClick={nextImage}
            >
              {'>'}
            </button>
          </>
        )}

        <div className={styles.wrapper}>
          {visibleImages.map((img, i) => (
            <img
              key={img}
              src={img}
              alt="banner"
              className={clsx(styles.image, { [styles.active]: i === index })}
            />
          ))}
        </div>

        <div className={styles.dots}>
          <div
            className={classNames(styles.dots__dot, {
              [styles.dotActive]: index === 0,
            })}
          ></div>
          <div
            className={classNames(styles.dots__dot, {
              [styles.dotActive]: index === 1,
            })}
          ></div>
          <div
            className={classNames(styles.dots__dot, {
              [styles.dotActive]: index === 2,
            })}
          ></div>
        </div>
      </header>

      {newModels ? (
        <Carousel items={newModels} title={'Brand new models'} />
      ) : (
        <p>тут має бути красіва загрузка але я далбайоб</p>
      )}

      <Categories />

      <HotPrices />
    </>
  );
};
