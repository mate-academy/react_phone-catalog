import React from 'react';
import styles from './CategoryCard.module.scss';
import { Typography } from '@shared/ui/Typography';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type Props = {
  translationKey: string;
  count: number;
  image: string;
  link: string;
};

export const CategoryCard: React.FC<Props> = ({
  translationKey,
  count,
  image,
  link,
}) => {
  const { t } = useTranslation();

  return (
    <article className={styles.category}>
      <Link to={link} className={styles.categoryImageWrapper}>
        <img src={image} className={styles.categoryImage} />
      </Link>

      <Link to={link} className={styles.categoryTitleLink}>
        <Typography variant="h3" className={styles.categoryTitle}>
          {translationKey}
        </Typography>
      </Link>

      <p className={styles.categorySubtitle}>
        {count} {t('models.model', { count: count })}
      </p>
    </article>
  );
};
