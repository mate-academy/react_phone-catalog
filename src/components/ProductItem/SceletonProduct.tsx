import React from 'react';
import styles from './SceletonProduct.module.scss';
import classNames from 'classnames';
import ContentLoader from 'react-content-loader';

type Props = {
  className?: string;
};

const SceletonProduct: React.FC<Props> = ({ className = '' }) => {
  return (
    <article className={classNames(styles.card, className)}>
      <ContentLoader
        className={styles.card__img}
        speed={2}
        backgroundColor="#161827"
        foregroundColor="#263050"
      >
        <rect x="0" y="0" width="100%" height="100%" />
      </ContentLoader>

      <ContentLoader
        className={styles.skeleton__title}
        speed={2}
        backgroundColor="#161827"
        foregroundColor="#263050"
      >
        <rect x="0" y="0" width="100%" height="21" />
        <rect x="0" y="27" width="80%" height="21" />
      </ContentLoader>

      <ContentLoader
        className={styles.skeleton__price}
        speed={2}
        backgroundColor="#161827"
        foregroundColor="#263050"
      >
        <rect x="0" y="0" width="45%" height="31" />
      </ContentLoader>

      <div className={styles.propertys}>
        {[...Array(3)].map((_, i) => (
          <ContentLoader
            key={i}
            className={styles.skeleton__property}
            speed={2}
            backgroundColor="#161827"
            foregroundColor="#263050"
          >
            <rect x="0" y="0" width="30%" height="12" />
            <rect x="70%" y="0" width="30%" height="12" />
          </ContentLoader>
        ))}
      </div>

      <div className={styles.card__buttons}>
        <ContentLoader
          className={styles.skeleton__button}
          speed={2}
          backgroundColor="#161827"
          foregroundColor="#263050"
        >
          <rect x="0" y="0" width="100%" height="40" />
        </ContentLoader>

        <ContentLoader
          className={styles.skeleton__icon}
          speed={2}
          backgroundColor="#161827"
          foregroundColor="#263050"
        >
          <rect x="0" y="0" width="40" height="40" />
        </ContentLoader>
      </div>
    </article>
  );
};

export default SceletonProduct;
