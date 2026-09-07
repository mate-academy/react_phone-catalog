import React, { useEffect, useState } from 'react';
import styles from './Breadcrumbs.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  page: string;
  productName?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ page, productName }) => {
  const [pageName, setPageName] = useState('');

  useEffect(() => {
    setPageName(page.charAt(0).toUpperCase() + page.slice(1).toLowerCase());
  }, [page]);

  return (
    <div className={styles.breadCrumbs}>
      <Link to="/" className="icon home"></Link>

      <div className={styles.way}>
        <span className="icon arrow" />
        {productName ? (
          <Link to={`/${page}`} className="title-small-gray strokeBtnText">
            {pageName}
          </Link>
        ) : (
          <span className="title-small-gray">{pageName}</span>
        )}
      </div>

      {productName && (
        <div className={styles.way}>
          <span className="icon arrow"></span>
          <span className="title-small-gray">{productName}</span>
        </div>
      )}
    </div>
  );
};
