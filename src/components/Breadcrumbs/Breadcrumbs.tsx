import { Link, useLocation, useParams } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

interface BreadcrumbsProps {
  productName?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ productName }) => {
  const { productId } = useParams();

  const location = useLocation().pathname;

  const pathSegments = location.split('/');

  const secondURLPart = pathSegments[1];

  return (
    <section className={styles.page__nav}>
      <Link to="/" className={styles.page__homeLink} />

      <div className={styles.page__navArrow}></div>

      {/* {true && (
        <Link to={`/${category}`} className={styles.page__pageLink}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Link>
      )} */}

      {secondURLPart && secondURLPart !== 'product' && (
        <>
          <Link to={`/${secondURLPart}`} className={styles.page__pageLink}>
            {secondURLPart.charAt(0).toUpperCase() + secondURLPart.slice(1)}
          </Link>

          {productId && <div className={styles.page__navArrow}></div>}
        </>
      )}

      {productId && (
        <>
          <p className={styles.page__pageLink}>{productName}</p>
        </>
      )}
    </section>
  );
};
