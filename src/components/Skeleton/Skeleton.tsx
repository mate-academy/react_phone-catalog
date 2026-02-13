import ContentLoader from 'react-content-loader';
import styles from './Skeleton.module.scss';

const Skeleton = () => (
  <div className={styles.sceletonContainer}>
    {Array(4)
      .fill(null)
      .map((_, index) => (
        <div className={styles.sceletonItem} key={index}>
          <ContentLoader
            speed={2}
            width={250}
            height={400}
            viewBox="0 0 250 400"
            backgroundColor="#2b2b3c"
            foregroundColor="#3e3e5a"
          >
            {/* Зображення */}
            <rect x="15" y="15" rx="10" ry="10" width="220" height="150" />
            {/* Назва */}
            <rect x="15" y="180" rx="4" ry="4" width="180" height="20" />
            {/* Ціна */}
            <rect x="15" y="210" rx="4" ry="4" width="80" height="20" />
            <rect x="105" y="210" rx="4" ry="4" width="60" height="20" />
            {/* Характеристики */}
            <rect x="15" y="250" rx="4" ry="4" width="100" height="15" />
            <rect x="15" y="275" rx="4" ry="4" width="120" height="15" />
            <rect x="15" y="300" rx="4" ry="4" width="90" height="15" />
            {/* Кнопка */}
            <rect x="15" y="340" rx="8" ry="8" width="220" height="40" />
          </ContentLoader>
        </div>
      ))}
  </div>
);

export default Skeleton;
