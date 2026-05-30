import { useLocation, Link } from 'react-router-dom';
import style from './ProductNav.module.scss';
import Home from './../../../../public/icon/Home.png';

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
    <ul className={style.productNav}>
      <li className={style.productNav__item}>
        <Link to="/" className={style.productNav__link}>
          <img src={Home} alt="Home" className={style.productNav__logo} />
        </Link>
      </li>

      {pathSegments.map((segment, index, array) => {
        currentPath += `/${segment}`;
        const segmentName = formatSegmentName(segment);
        const lastSegment = index === array.length - 1;

        return (
          <li className={style.productNav__item} key={segment}>
            {lastSegment ? (
              <p className={style.productNav__current}>{segmentName}</p>
            ) : (
              <Link to={currentPath} className={style.productNav__link}>
                {segmentName}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};
