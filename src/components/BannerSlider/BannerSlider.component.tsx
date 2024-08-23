import { useEffect, useState } from 'react';
import cn from 'classnames';

const bannerImgs = [
  {
    url: './img/banner-accessories.png',
    title: 'Shop the best accessories here!',
    subtitle: 'Get it now!',
  },
  {
    url: './img/banner-phones.png',
    title: 'Order now your new phone!',
    subtitle: "Don't miss it!",
  },
  {
    url: './img/banner-tablets.png',
    title: 'The best tablets are here!',
    subtitle: 'Get it now!',
  },
];

const getTotalImgs = () => {
  const indexNumbers = [];

  for (let i = 0; i <= bannerImgs.length - 1; i++) {
    indexNumbers.push(i);
  }

  return indexNumbers;
};

export const BannerSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = bannerImgs.length - 1;

    if (index < 0) {
      setIndex(lastIndex);
    }

    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index]);

  const handlePrevBtn = () => setIndex(index - 1);
  const handleNextBtn = () => setIndex(index + 1);

  return (
    <section className="slider">
      <div className="slider__container">
        <button className="slider__prevBtn" onClick={handlePrevBtn} />

        <div className="slider__frame">
          {bannerImgs.map((img, imgIdx) => {
            let position = 'nextSlide';

            if (imgIdx === index) {
              position = 'activeSlide';
            }

            if (
              imgIdx === index - 1 ||
              (index === 0 && imgIdx === bannerImgs.length - 1)
            ) {
              position = 'lastSlide';
            }

            return (
              <article
                key={imgIdx + 1}
                className={`slider__item slider__item--${position}`}
              >
                <div className="slider__overlay">
                  <h1 className="slider__overlay-title">{img.title}</h1>
                  <h3 className="slider__overlay-subtitle">{img.subtitle}</h3>
                </div>
                <img
                  src={img.url}
                  className="slider__image"
                  alt={img.url.split('-')[1].split('.')[0].toUpperCase()}
                />
              </article>
            );
          })}
        </div>

        <button className="slider__nextBtn" onClick={handleNextBtn} />
      </div>
      <div className="dots__container">
        <ul className="dots__list">
          {getTotalImgs().map(idx => {
            return (
              <a
                className="dots__link"
                key={idx + 1}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  setIndex(idx);
                }}
              >
                <li
                  className={cn('dots__item', {
                    'dots__item--active': idx === index,
                  })}
                ></li>
              </a>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
