import ContentLoader from 'react-content-loader';
import styles from './SkeletonPanelOptions.module.scss';

export const SkeletonPanelOptions: React.FC = () => {
  return (
    <div className={styles.PanelOptions}>
      <div className={styles.PanelOptions__option}>
        <ContentLoader
          speed={2}
          backgroundColor="#161827"
          foregroundColor="#263050"
          className={styles.skeleton__header}
        >
          <rect x="0" y="0" width="30%" height="12" />
          <rect x="70%" y="0" width="30%" height="12" />
        </ContentLoader>

        <div className={styles.PanelOptions__colorsList}>
          {[...Array(4)].map((_, i) => (
            <ContentLoader
              key={i}
              speed={2}
              backgroundColor="#161827"
              foregroundColor="#263050"
              className={styles.skeleton__color}
            >
              <rect x="0" y="0" width="100%" height="100%" rx="50%" />
            </ContentLoader>
          ))}
        </div>
      </div>

      <ContentLoader
        speed={2}
        backgroundColor="#161827"
        foregroundColor="#263050"
        className={styles.skeleton__hr}
      >
        <rect x="0" y="0" width="100%" height="1" />
      </ContentLoader>

      <div className={styles.PanelOptions__option}>
        <ContentLoader
          speed={2}
          backgroundColor="#161827"
          foregroundColor="#263050"
          className={styles.skeleton__subheader}
        >
          <rect x="0" y="0" width="40%" height="12" />
        </ContentLoader>

        <div className={styles.PanelOptions__capacityList}>
          {[...Array(3)].map((_, i) => (
            <ContentLoader
              key={i}
              speed={2}
              backgroundColor="#161827"
              foregroundColor="#263050"
              className={styles.skeleton__capacity}
            >
              <rect x="0" y="0" width="100%" height="100%" />
            </ContentLoader>
          ))}
        </div>
      </div>

      <ContentLoader
        speed={2}
        backgroundColor="#161827"
        foregroundColor="#263050"
        className={styles.skeleton__hr}
      >
        <rect x="0" y="0" width="100%" height="1" />
      </ContentLoader>

      <ContentLoader
        speed={2}
        backgroundColor="#161827"
        foregroundColor="#263050"
        className={styles.skeleton__price}
      >
        <rect x="0" y="0" width="120px" height="32px" />
        <rect x="140px" y="8px" width="80px" height="22px" />
      </ContentLoader>

      <div className={styles.PanelOptions__buttons}>
        <ContentLoader
          speed={2}
          backgroundColor="#161827"
          foregroundColor="#263050"
          className={styles.skeleton__button}
        >
          <rect x="0" y="0" width="100%" height="48px" />
        </ContentLoader>

        <ContentLoader
          speed={2}
          backgroundColor="#161827"
          foregroundColor="#263050"
          className={styles.skeleton__favButton}
        >
          <rect x="0" y="0" width="48px" height="48px" />
        </ContentLoader>
      </div>

      <ul className={styles.PanelOptions__details}>
        {[...Array(4)].map((_, i) => (
          <ContentLoader
            key={i}
            speed={2}
            backgroundColor="#161827"
            foregroundColor="#263050"
            className={styles.skeleton__detail}
          >
            <rect x="0" y="0" width="30%" height="12" />
            <rect x="70%" y="0" width="30%" height="12" />
          </ContentLoader>
        ))}
      </ul>
    </div>
  );
};
