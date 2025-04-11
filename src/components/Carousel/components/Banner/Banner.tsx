import React from 'react';
import { Link } from 'react-router-dom';
import bannerStyles from './Banner.module.scss';

type Props = {
  category: string;
};

export const Banner: React.FC<Props> = ({ category }) => {
  return (
    <article className={bannerStyles.banner}>
      <div className={bannerStyles.banner__content}>
        <div className={bannerStyles.banner__headings}>
          <h2 className={bannerStyles.banner__title}>
            Now available in our store!
          </h2>
          <p className={bannerStyles.banner__subtitle}>Be the first</p>
        </div>
        <Link to={`${category}`} className={bannerStyles.banner__orderButton}>
          ORDER NOW
        </Link>
      </div>
      <figure className={bannerStyles.banner__imageWrapper}>
        <img
          src={`/public/img/banner-${category}.png`}
          alt={`Promo banner for ${category}`}
          className={bannerStyles.banner__image}
        />
      </figure>
    </article>
  );
};
