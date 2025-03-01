import styles from './ProductNav.module.scss';
import Home from '../../images/icons/Home.png';
import { Link, useLocation } from 'react-router-dom';

export const ProductNav = () => {
  const location = useLocation();

  const pathSegments = location.pathname
    .replaceAll('#', '')
    .split('/')
    .filter(segment => !!segment.length);

  let currentPath = '';

  const formatSegmentName = (segment: string) => {
    return segment
      .replaceAll('-', ' ')
      .split(' ')
      .map(word => {
        if (word.toLowerCase() === 'gb') {
          return 'GB';
        }

        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
  };

  return (
    <ul className={styles['product-nav']}>
      <li className={styles['product-nav-item']}>
        <Link to={'/'} className={styles['product-nav__link']}>
          <img src={Home} className={styles['product-nav__logo']} />
        </Link>
      </li>

      {pathSegments.map((segment, index, array) => {
        currentPath += `/${segment}`;
        const segmentName = formatSegmentName(segment);
        const lastSegment = index === array.length - 1;

        return (
          <li className={styles['product-nav-item']} key={segment}>
            {lastSegment ? (
              <p className={styles['product-nav__current']}>{segmentName}</p>
            ) : (
              <Link to={currentPath} className={styles['product-nav__link']}>
                {segmentName}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};
