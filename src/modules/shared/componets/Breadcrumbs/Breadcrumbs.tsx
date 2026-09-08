import { Link, useLocation, useParams } from 'react-router-dom';
import styles from './BreadCrumbs.module.scss';

export const BreadCrumbs = () => {
  const { category, productId } = useParams();

  const location = useLocation();

  const res = location.pathname.split('/')[1];

  const normalize = (text: string) => {
    return text[0].toUpperCase() + text.slice(1, text.length);
  };

  return (
    <div className={styles.bread__crumbs}>
      <Link to="/" className={styles.home__link}></Link>

      {category && productId ? (
        <>
          <Link to={`/${category}`} className={styles.category__link}>
            {normalize(category)}
          </Link>

          <p className={styles.product__link}>{normalize(productId)}</p>
        </>
      ) : (
        <p className={styles.category}>{normalize(res)}</p>
      )}
    </div>
  );
};
