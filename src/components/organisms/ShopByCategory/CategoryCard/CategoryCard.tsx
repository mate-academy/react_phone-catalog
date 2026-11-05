import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { routePaths } from '@/app/router/routes';

import { Typography } from '@/components/atoms';
import { ImageWithFallback } from '@/components/organisms/ImageWithFallback';

import styles from './CategoryCard.module.scss';

interface Props {
  title: string;
  count: number;
  imageSrc: string;
  linkUrl: string;
  backgroundSrc: string;
}

export const CategoryCard = ({
  title,
  count,
  imageSrc,
  linkUrl,
  backgroundSrc,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Link
      to={routePaths.catalog(linkUrl)}
      className={styles.card}
    >
      <div
        className={styles.container}
        data-category={linkUrl}
        style={{ backgroundImage: `url(${backgroundSrc})` }}
      >
        <div className={styles.info}>
          <Typography
            variant="h3"
            className={styles.title}
          >
            {title}
          </Typography>
          <Typography
            variant="bodytext"
            className={styles.count}
          >
            {t('modelsCount', { count })}
          </Typography>
        </div>

        <ImageWithFallback
          src={imageSrc}
          alt={`${title} category`}
          className={styles.image}
        />
      </div>
    </Link>
  );
};
