import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

interface Props {
  category?: string;
  productName?: string;
}

export const Breadcrumbs: React.FC<Props> = ({ category, productName }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.breadcrumbs}>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className={styles.backButton}
      >
        <span className={styles.backArrow}>‹</span>
        <span>Back</span>
      </button>

      <div className={styles.navPath}>
        <Link to="/" className={styles.homeIcon} aria-label="Home">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d={
                'M2 6.5L8 2L14 6.5V13.5C14 13.7652 13.8946 14.0196 ' +
                '13.7071 14.2071C13.5196 14.3946 13.2652 14.5 13 14.5H3' +
                'C2.73478 14.5 2.48043 14.3946 2.29289 14.2071' +
                'C2.10536 14.0196 2 13.7652 2 13.5V6.5Z'
              }
              stroke="#0F0F11"
              strokeWidth="1.2"
            />
          </svg>
        </Link>

        {category && (
          <>
            <span className={styles.separator}>›</span>
            <Link to={`/${category.toLowerCase()}`} className={styles.link}>
              {category}
            </Link>
          </>
        )}

        {productName && (
          <>
            <span className={styles.separator}>›</span>
            <span className={styles.current}>{productName}</span>
          </>
        )}
      </div>
    </div>
  );
};
