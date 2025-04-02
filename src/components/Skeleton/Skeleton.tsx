import styles from './Skeleton.module.scss';
import ContentLoader from 'react-content-loader';

type Props = {};

const Skeleton: React.FC<Props> = () => {
  return (
    <div className={styles.skeleton}>
      <ContentLoader
        speed={2}
        width="100%"
        height="100%"
        viewBox="0 0 1200 550"
        backgroundColor="#fafafa"
        foregroundColor="#ecebeb"
        preserveAspectRatio="xMidYMid meet"
      >
        // ! Breadcrumbs
        <rect x="3%" y="1%" rx="3" ry="3" width="10%" height="5%" />
        // ! Title
        <rect x="3%" y="10%" rx="4" ry="4" width="20%" height="8%" />
        // ! Models
        <rect x="3%" y="20%" rx="4" ry="4" width="8%" height="4%" />
        // ! Select label #1
        <rect x="3%" y="30%" rx="4" ry="4" width="6%" height="3%" />
        // ! Select input #1
        <rect x="3%" y="34%" rx="4" ry="4" width="15%" height="8%" />
        // ! Select label #2
        <rect x="23%" y="30%" rx="4" ry="4" width="6%" height="3%" />
        // ! Select input #2
        <rect x="23%" y="34%" rx="4" ry="4" width="15%" height="8%" />
        // ! Card #1
        <rect x="3%" y="55%" rx="4" ry="4" width="15%" height="40%" />
        // ! Card #2
        <rect x="23%" y="55%" rx="4" ry="4" width="15%" height="40%" />
        // ! Card #3
        <rect x="43%" y="55%" rx="4" ry="4" width="15%" height="40%" />
        // ! Card #4
        <rect x="63%" y="55%" rx="4" ry="4" width="15%" height="40%" />
      </ContentLoader>
    </div>
  );
};

export default Skeleton;
