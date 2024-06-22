import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import styles from './Breadcrumbs.module.scss';
import { BASE_URL } from '../../utils/const';

type Breadcrumb = {
  name: string;
  path: string;
  isLast: boolean;
};

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const { allProducts } = useContext(ProductContext);
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

  useEffect(() => {
    const pathnames = pathname.split('/').filter(x => x);
    const breadcrumbItems = pathnames.map((name, index) => {
      const breadcrumbPath = `/${pathnames.slice(0, index + 1).join('/')}`;
      const isLast = index === pathnames.length - 1;

      let displayName = name.replace(/-/g, ' ');

      // Check if it's a product ID and replace the name with product name if it is
      if (index === 1) {
        const product = allProducts.find(item => item.itemId === name);

        if (product) {
          displayName = product.name;
        }
      }

      return { name: displayName, path: breadcrumbPath, isLast };
    });

    setBreadcrumbs(breadcrumbItems);
  }, [pathname, allProducts]);

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.homeLink}>
        <img
          src={`${BASE_URL}/icons/Home.svg`}
          alt="Home"
          className={styles.icon}
        />
      </Link>
      {breadcrumbs.map(({ name, path, isLast }) => (
        <span key={path} className={styles.breadcrumbItem}>
          <img
            src={`${BASE_URL}/icons/ArrowRight.svg`}
            alt="ArrowRight"
            className={styles.arrow}
          />
          {isLast ? (
            <span className={styles.current}>{name}</span>
          ) : (
            <Link to={path} className={styles.link}>
              {name}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
