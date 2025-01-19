import styles from './PicturesSlider.module.scss';
import * as banners from '../../constants/banners';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSwipeable } from 'react-swipeable';
import classNames from 'classnames';
import { IconButton } from '../../../shared/components/IconButton';
import { TABLET_MIN_WIDTH } from '../../../shared/_constans/MIN_WIDTHS';
import { ArrowIcon } from '../../constants/icons';
import { useSlider } from '../../hooks/useSlider';

export const PicturesSlider = () => {
  const minBannersLength = Math.min(
    banners.MOBILE_BANNERS.length,
    banners.TABLET_BANNERS.length,
  );
  const { currentIndex, handlePrev, handleNext, goToIndex } = useSlider({
    itemCount: minBannersLength,
    autoPlay: true,
    autoPlayInterval: 5000,
  });

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handleNext(),
  });

  return (
    <section className={styles['pictures-slider']} {...swipeHandlers}>
      <div className={styles['pictures-slider__subtitle']}>
        Welcome to Nice Gadgets store!
      </div>

      <div className={styles['pictures-slider__slider']}>
        <div className={styles['pictures-slider__button']}>
          <IconButton
            direction="left"
            onClick={handlePrev}
            disabled={false}
            icon={<ArrowIcon />}
          />
        </div>

        <div className={styles['pictures-slider__imageWrapper']}>
          <picture className={styles['pictures-slider__picture']}>
            <source
              media={`(min-width: ${TABLET_MIN_WIDTH})`}
              srcSet={banners.TABLET_BANNERS[currentIndex]}
            />
            <img
              src={banners.MOBILE_BANNERS[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className={classNames(styles['pictures-slider__image'])}
            />
          </picture>
        </div>

        <div className={styles['pictures-slider__button']}>
          <IconButton
            direction="right"
            onClick={handleNext}
            disabled={false}
            icon={<ArrowIcon />}
          />
        </div>
      </div>

      <div className={styles['pictures-slider__controls']}>
        {banners.MOBILE_BANNERS.map((urlToImage, index) => {
          if (index === minBannersLength) {
            return;
          }

          return (
            <button
              key={urlToImage}
              className={styles['pictures-slider__control']}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => goToIndex(index)}
            >
              <div
                className={classNames(styles['pictures-slider__inner'], {
                  [styles['pictures-slider__inner--active']]:
                    index === currentIndex,
                })}
              ></div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
