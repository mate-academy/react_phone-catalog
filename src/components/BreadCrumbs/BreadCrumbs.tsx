import { Link } from 'react-router-dom';
import styles from './BreadCrumbs.module.scss';
// eslint-disable-next-line max-len
import { PhoneDetails } from '../../modules/ProductDetails/interfaces/PhoneDetailsInterface';
import { useEffect } from 'react';

const pageTitles: Record<string, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

interface BreadCrumbsProps {
  category?: string;
  product?: PhoneDetails;
}

export const BreadCrumbs: React.FC<BreadCrumbsProps> = ({
  category,
  product,
}) => {
  useEffect(() => {
    alert(JSON.stringify(product, null, 2));
    console.log('product =>', product);
  }, [product]);
  // const location = useLocation();
  // const parts = location.pathname.split('/').filter(Boolean);

  return (
    <nav className={styles.breadcrumbs}>
      <ul className={styles.breadcrumbs__list}>
        <li className={styles.breadcrumbs__item}>
          <Link to="/" className={styles.breadcrumbs_link}>
            <img
              src="/img/icons/Home.png"
              alt="Home icon"
              className={styles.breadcrumbs_icon}
            />
          </Link>
        </li>
        {/* {parts.map((part, index) => {
          const isLast = index === parts.length - 1;
          const title = pageTitles[part] || part; */}
        {/* {category && (
          <li key={part} className={styles.breadcrumbs__item}>
            <img
              src="/img/icons/arrow_right.png"
              alt="arrow"
              className={styles.breadcrumbs_arrow}
            />
            {isLast ? (
              <span className={styles.breadcrumbs_active}>{title}</span>
            ) : (
              <Link to={`/${part}`} className={styles.breadcrumbs__link}>
                {title}
              </Link>
            )}
          </li>
        )} */}
        {/* })} */}

        {category && (
          <li className={styles.breadcrumbs__item}>
            <img
              src="/img/icons/right_white_arrow.svg"
              alt="arrow"
              className={styles.breadcrumbs_arrow}
            />
            <Link to={`/${category}`} className={styles.breadcrumbs__link}>
              {pageTitles[category] || category}
            </Link>
          </li>
        )}

        {product && (
          <li className={styles.breadcrumbs__item}>
            <img
              src="/img/icons/right_white_arrow.svg"
              alt="arrow"
              className={styles.breadcrumbs_arrow}
            />
            <span className={styles.breadcrumbs_active}>{product.name}</span>
          </li>
        )}
      </ul>
    </nav>
  );
};
