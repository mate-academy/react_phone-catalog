import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import homeIcon from '../../img/icons/HomeIcon.svg';
import chevronIcon from '../../img/icons/ChevronIcon.svg';
import { useAppContext } from '../../context/AppContext';

type BreadcrumbsProps = {
  category: string;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ category }) => {
  const editedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const [includeProduct, setIncludeProduct] = useState<boolean>(false);
  const { clickedProduct } = useAppContext();
  const clickedProductName = clickedProduct?.name;

  useEffect(() => {
    if (window.location.href.includes('/product/')) {
      setIncludeProduct(true);
    } else {
      setIncludeProduct(false);
    }
  }, [clickedProduct]);

  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/">
        <img src={homeIcon} alt="Home" className={styles.homeIcon} />
      </Link>

      <span className={styles.chevronSpan}>
        <img src={chevronIcon} alt="Chevron" className={styles.chevronIcon} />
      </span>

      <Link to={`/${category}`} className={`${includeProduct ? styles.labelBlack : styles.label}`}>
        {editedCategory}
      </Link>

      {includeProduct && clickedProduct && (
        <>
          <span className={styles.chevronSpan}>
            <img src={chevronIcon} alt="Chevron" className={styles.chevronIcon} />
          </span>
          <Link to={`/product/${encodeURIComponent(clickedProduct.itemId)}`} className={styles.label}>
            {clickedProductName}
          </Link>
        </>
      )}
    </nav>
  );
};
