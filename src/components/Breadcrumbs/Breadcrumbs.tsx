import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Player } from '@lordicon/react';

import styles from './Breadcrumbs.module.scss';

import homeIcon from '../../img/home.json';
import { ArrowIcon } from '../ArrowIcon';
import { useLordicon } from '../../hooks/useLordicon';

import { getCategoryByPath } from '../../utils/categories';

export const Breadcrumbs: React.FC = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const pathNames = pathname.split('/').filter(Boolean);

  const category = getCategoryByPath(pathNames[0] || '');

  const productSlug = pathNames[1] || null;

  const formatSlug = (slug: string) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const { playerRef, handleMouseEnter } = useLordicon();

  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/" onMouseEnter={handleMouseEnter}>
        <Player icon={homeIcon} ref={playerRef} />
      </Link>

      {category && (
        <>
          <ArrowIcon className={styles.arrow} />

          {!productSlug ? (
            <span className={styles.current}>
              {t(`categories.${category.title}`, category.label)}
            </span>
          ) : (
            <Link className={styles.categoryTitle} to={`/${category.path}`}>
              {t(`categories.${category.title}`, category.label)}
            </Link>
          )}
        </>
      )}

      {productSlug && (
        <>
          <ArrowIcon className={styles.arrow} />
          <span className={styles.current}>{formatSlug(productSlug)}</span>
        </>
      )}
    </nav>
  );
};
