import { Link } from 'react-router-dom';
import { CategotyCard } from '../../types/CategoriesList';
import { useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../utils/i18n/translations';

export const CategoryCard: React.FC<CategotyCard> = ({
  title,
  link,
  ariaLabelLink,
  imageUrl,
  imageAlt,
  quantity,
}) => {
  const { t } = useTranslation();
  const [isSkeleton, setIsSkeleton] = useState<boolean>(true);

  return (
    <article className="category-card">
      <Link
        to={link}
        className={classNames('category-card__image-frame', {
          skeleton: isSkeleton,
        })}
        aria-label={ariaLabelLink}
      >
        <div className="category-card__image-gradient">
          <h4>{t(TRANSLATIONS.category.card.tooltip)}</h4>
        </div>
        <img
          src={imageUrl}
          alt={imageAlt}
          className="category-card__image"
          onLoad={() => setIsSkeleton(false)}
        />
      </Link>
      <Link
        to={link}
        className="category-card__title-link"
        aria-label={ariaLabelLink}
      >
        <h4 className="category-card__title">{title}</h4>
      </Link>
      <p className="category-card__subtitle">
        {t(TRANSLATIONS.category.card.quantity_interval, {
          postProcess: 'interval',
          count: quantity,
        })}
      </p>
    </article>
  );
};
