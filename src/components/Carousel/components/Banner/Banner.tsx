import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import bannerStyles from './Banner.module.scss';
import { Category } from '../../../../types/Category';

type Props = {
  category: Category;
};

export const Banner: React.FC<Props> = memo(({ category }) => {
  return (
    <article className={bannerStyles.banner}>
      <div className={bannerStyles.banner__content}>
        <div className={bannerStyles.banner__headings}>
          <h3 className={bannerStyles.banner__title}>
            {category.description.title}
          </h3>
          <p className={bannerStyles.banner__subtitle}>
            {category.description.subtitle}
          </p>
        </div>
        <Link to={category.name} className={bannerStyles.banner__orderButton}>
          ORDER NOW
        </Link>
      </div>
      <figure className={bannerStyles.banner__imageWrapper}>
        <img
          src={category.banner}
          alt={`Promo banner for ${category.name}`}
          className={bannerStyles.banner__image}
        />
      </figure>
    </article>
  );
});

Banner.displayName = 'Banner';
