import { Link } from 'react-router-dom';
import { CategotyCard } from '../../types/CategoriesList';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../utils/i18n/translations';
import styles from './CategoryCard.module.scss';

export const CategoryCard: React.FC<CategotyCard> = ({
  title,
  link,
  ariaLabelLink,
  imageUrl,
  imageAlt,
  quantity,
}) => {
  const { t } = useTranslation();

  return (
    <article className={styles.block}>
      <Link to={link} className={styles.imageFrame} aria-label={ariaLabelLink}>
        <div className={styles.imageGradient}>
          <h4 className={styles.tooltip}>
            {t(TRANSLATIONS.category.card.tooltip)}
          </h4>
        </div>
        <img
          src={imageUrl}
          alt={imageAlt}
          className={styles.image}
          loading="lazy"
        />
      </Link>
      <Link to={link} className={styles.titleLink} aria-label={ariaLabelLink}>
        <h4 className={styles.title}>{title}</h4>
      </Link>
      <p className={styles.subtitle}>
        {t(TRANSLATIONS.category.card.quantity_interval, {
          postProcess: 'interval',
          count: quantity,
        })}
      </p>
    </article>
  );
};
