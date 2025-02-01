import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/css/navigation';
import './Slider.scss';
import styles from './Slider.module.scss';

import { imagesHero } from '../../../../../constants/imagesHero';
import { CTAId } from '../../../../../types/CTAId';
import { useTranslation, Trans } from 'react-i18next';

export const Slider = () => {
  const { t } = useTranslation(['homepage', 'common']);

  const pagination = {
    clickable: true,
    renderBullet: function (_: number, className: string) {
      return '<span class="' + className + '"></span>';
    },
  };

  const imgs = [...imagesHero];

  return (
    <div className={styles.sliderContainer}>
      <div>
        <div className={styles.swiperContainer}>
          <Swiper
            pagination={pagination}
            modules={[Pagination, Autoplay, Navigation]}
            className="mySlider heroSlider"
            navigation={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
          >
            {imgs.map(({ id, srcSmall, srcLarge }, i) => (
              <SwiperSlide key={id}>
                <div
                  className={classNames(styles.ctaContainer, {
                    [styles.ctaContainerRight]: id === 'Apple watch 10',
                  })}
                >
                  <p
                    className={classNames(styles.ctaText, {
                      [styles.ctaTextBlack]: id === CTAId.iphone,
                      [styles.ctaTextOrange]: id === CTAId.watch,
                    })}
                  >
                    {id === CTAId.ipad ? (
                      <span>
                        <Trans i18nKey={'heroSlider.slideTitleTablets'}>
                          Now available
                          <br /> in our store!
                        </Trans>
                      </span>
                    ) : id === CTAId.iphone ? (
                      <span>
                        <Trans i18nKey={'heroSlider.slideTitlePhones'}>
                          AI-opening
                          <br /> possibilities.
                        </Trans>
                      </span>
                    ) : (
                      <span>
                        <Trans i18nKey={'heroSlider.slideTitleAccessories'}>
                          New finish.
                          <br /> Never quit.
                        </Trans>
                      </span>
                    )}
                  </p>
                  <div>
                    <Link
                      to={`${id === CTAId.iphone ? '/phones' : id === CTAId.watch ? '/accessories' : '/tablets'}`}
                      className={classNames(styles.ctaBtn, {
                        [styles.ctaBtnBlack]: id === CTAId.iphone,
                        [styles.ctaBtnWhite]: id === CTAId.watch,
                      })}
                      aria-label={t('accessibility.orderNow', { ns: 'common' })}
                    >
                      {t('heroSlider.orderNow', { ns: 'homepage' })}
                    </Link>
                  </div>
                </div>
                <picture key={id + i}>
                  <source media="(max-width: 639px)" srcSet={srcSmall} />
                  <source media="(min-width: 640px)" srcSet={srcLarge} />
                  <img src={srcSmall} alt={id} />
                </picture>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
