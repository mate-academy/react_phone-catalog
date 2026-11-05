import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ArrowIcon, Typography } from '@/components/atoms';
import { TextButton } from '@/components/molecules';

import { ImageWithFallback } from '../../ImageWithFallback';
import type { HeroSlide } from '../HeroSlider.types';

import styles from './Slide.module.scss';

type Props = {
  data: Omit<HeroSlide, 'id'>;
};

export const Slide = ({ data }: Props) => {
  const { t } = useTranslation();

  return (
    <div
      className={classNames(styles.slideContent, styles[data.colorScheme])}
      style={{ backgroundImage: `url("${data.backgroundImage}")` }}
    >
      <div className={styles.slideInfo}>
        <div className={styles.heading}>
          <Typography
            variant="smalltext"
            className={styles.eyebrow}
          >
            {t('newArrival')}
          </Typography>

          <h2 className={styles.phoneTitle}>
            <span className={styles.title}>{data.title}</span>
            <span className={styles.accentTitle}>{data.accentTitle}</span>
          </h2>

          <Typography
            variant="smalltext"
            className={styles.subtitle}
          >
            {data.subtitle}
          </Typography>
        </div>

        <div className={styles.features}>
          {data.features.map((feature) => (
            <div
              key={feature.title}
              className={styles.feature}
            >
              <span
                className={styles.featureIcon}
                style={{
                  maskImage: `url("${feature.icon}")`,
                  WebkitMaskImage: `url("${feature.icon}")`,
                }}
                aria-hidden="true"
              />

              <span className={styles.featureTitle}>{feature.title}</span>

              <span className={styles.featureDescription}>
                {feature.description}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <TextButton className={styles.button}>
            <Link
              to={data.buttonLink}
              className={styles.buttonLink}
            >
              {data.buttonText}
              <ArrowIcon direction="right" />
            </Link>
          </TextButton>
        </div>
      </div>

      <div className={styles.imageContainer}>
        <ImageWithFallback
          src={data.image}
          alt={data.title}
          draggable={false}
          data-swiper-parallax-y="200"
        />
      </div>
    </div>
  );
};
