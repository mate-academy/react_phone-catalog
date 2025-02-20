import { Link, useParams } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

interface BreadcrumbsProps {
  productName?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ productName }) => {
  const { category, productId } = useParams();

  return (
    <section className={styles.page__nav}>
      <Link to="/" className={styles.page__homeLink} />

      <div className={styles.page__navArrow}></div>

      <Link
        to={category ? `/${category}` : '/phones'}
        className={styles.page__pageLink}
      >
        {category
          ? category.charAt(0).toUpperCase() + category.slice(1)
          : 'Phones'}
      </Link>

      {productId && (
        <>
          <div className={styles.page__navArrow}></div>

          <Link
            to={`/${category}/${productId}`}
            className={styles.page__pageLink}
          >
            {productName}
          </Link>
        </>
      )}
    </section>
  );
};
