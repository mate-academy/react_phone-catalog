import { useEffect, useState } from 'react';

export const Banner = () => {
  const bannerImages = [
    './new/img/banner-tablets.png',
    './new/img/banner-phones.png',
    './new/img/banner-accessories.png',
  ];

  const [bannerId, setBannerId] = useState<number>(-1);
  const bannerWidth = (window.innerWidth > 1240) ? 1040 : 560;
  const handleBannerScroll = (side: number) => {
    setBannerId(prevId => {
      let newValue = 0;

      switch (prevId + side) {
        case 2:
          newValue = -1;
          break;

        case -2:
          newValue = 1;
          break;

        default:
          newValue = prevId + side;
      }

      return newValue;
    });
  };

  useEffect(() => {
    const dots = document.querySelector('.banner__dots');

    switch (bannerId) {
      case -1:
        dots?.classList.toggle('icon--dots--0', true);
        dots?.classList.toggle('icon--dots--1', false);
        dots?.classList.toggle('icon--dots--2', false);
        break;

      case 0:
        dots?.classList.toggle('icon--dots--0', false);
        dots?.classList.toggle('icon--dots--1', true);
        dots?.classList.toggle('icon--dots--2', false);
        break;

      case 1:
        dots?.classList.toggle('icon--dots--1', false);
        dots?.classList.toggle('icon--dots--2', true);
        break;

      default:
        break;
    }
  }, [bannerId]);

  return (
    <section className="banner">
      <div className="banner__main">
        <button
          aria-label="banner__icon"
          type="button"
          className="slider-button slider-button__left banner__icon"
          onClick={() => handleBannerScroll(-1)}
        />
        <div className="banner__cover">
          <ul className="banner__list">
            {bannerImages.map(image => (
              <li
                key={image}
                style={{
                  transition: '500ms',
                  transform: `translateX(${bannerWidth * -bannerId}px)`,
                }}
              >
                <img
                  className="banner__image"
                  src={image}
                  alt="Banner"
                />
              </li>
            ))}
          </ul>
        </div>
        <button
          aria-label="banner__icon"
          type="button"
          className="slider-button slider-button__right banner__icon"
          onClick={() => handleBannerScroll(1)}
        />
      </div>
      <div className="banner__footer">
        <p className="banner__dots icon icon--dots icon--dots--0" />
      </div>
    </section>
  );
};
