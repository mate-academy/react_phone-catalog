import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Breadcrumbs.module.scss';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.preventDefault();

    navigate('/', { replace: true });

    setTimeout(() => {
      const element = document.getElementById('categories-section');

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/" className={styles.home}></Link>

      {pathnames.map((name, index) => {
        const isCategoryPage = pathnames[0] === 'category';
        const isCategoryCrumb =
          name === 'category' || (isCategoryPage && index === 0);

        const isLast = index === pathnames.length - 1;
        const displayName = name.charAt(0).toUpperCase() + name.slice(1);

        if (isCategoryCrumb) {
          return (
            <React.Fragment key="category">
              <span className={styles.separator}>&gt;</span>
              <button
                onClick={handleCategoryClick}
                className={styles.link}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                }}
              >
                {t('categories')}
              </button>
            </React.Fragment>
          );
        }

        if (isLast) {
          return (
            <span key={name} className={styles.current}>
              &gt; {displayName}
            </span>
          );
        }

        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;

        return (
          <React.Fragment key={routeTo}>
            <Link to={routeTo} className={styles.link}>
              {displayName}
            </Link>
          </React.Fragment>
        );
      })}
    </nav>
  );
};
