import styles from './SkeletonGallery.module.scss';
import classNames from 'classnames';
import ContentLoader from 'react-content-loader';

export const SkeletonGallery: React.FC = () => {
  return (
    <div className={styles.Gallery}>
      <ul className={styles.Gallery__list}>
        {[...Array(5)].map((_, i) => (
          <li
            key={i}
            className={classNames(styles.Gallery__item, styles.skeleton__item)}
          >
            <ContentLoader
              speed={2}
              backgroundColor="#161827"
              foregroundColor="#263050"
              className={styles.skeleton__thumb}
            >
              <rect x="0" y="0" width="100%" height="100%" />
            </ContentLoader>
          </li>
        ))}
      </ul>

      <div className={styles.Gallery__img}>
        <ContentLoader
          speed={2}
          backgroundColor="#161827"
          foregroundColor="#263050"
          className={styles.skeleton__main}
        >
          <rect x="0" y="0" width="100%" height="100%" />
        </ContentLoader>
      </div>
    </div>
  );
};
