import React from 'react';
import styles from './NavigateBar.module.scss';
import { Link, useLocation, useParams } from 'react-router-dom';

export const NavigateBar: React.FC = () => {
  const { category, productId } = useParams<{
    category: string;
    productId?: string;
  }>();

  const location = useLocation();
  const path = location.pathname;

  const isSpecialPage = path === '/favorites' || path === '/cart';

  const pageName = path.replace('/', '');

  return (
    <>
      <div className={styles.urlplace}>
        <Link to={'/home'} className={styles.aсli}>
          <img src="./img/icons/Home.svg" alt="" className={styles.aс} />
        </Link>

        <img src="./img/icons/arrowRight.svg" alt="" className={styles.aс} />
        {isSpecialPage && (
          <p className={styles.aс}>
            {pageName.charAt(0).toUpperCase() + pageName.slice(1)}
          </p>
        )}

        {!isSpecialPage && (
          <>
            <Link to={`/${category}`} className={styles.aсli}>
              <p className={styles.aс}>
                {category &&
                  category.charAt(0).toUpperCase() + category.slice(1)}
              </p>
            </Link>

            <img
              src="./img/icons/arrowRight.svg"
              alt=""
              className={styles.aс}
            />

            {productId && (
              <Link to={`/${category}/${productId}`} className={styles.aсli}>
                <p className={styles.acс}>
                  {productId.charAt(0).toUpperCase() + productId.slice(1)}
                </p>
              </Link>
            )}
          </>
        )}
      </div>
    </>
  );
};
