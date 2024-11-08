import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { Icons } from '@ui/index';

import { regProducts } from '@utils/constants/regProducts';
import { ROUTES } from '@utils/constants/routes';

import styles from './Breadcrumb.module.scss';

type TProps = {
  text?: string;
  id?: string;
  category?: string;
};

export const Breadcrumbs: FC<TProps> = ({ text = '', id, category }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const regIsActive = regProducts.test(pathname);
  const localizedText = t(`nav.${text}`);
  const localizedCategory = t('breadcrumbs.category', { category });

  return (
    <div className={styles.links}>
      <Link to={ROUTES.HOME} title={t('breadcrumbs.titleLink')}>
        <Icons.HomeIcon />
      </Link>
      <Icons.ArrowRightIcon />

      {regIsActive && category ? (
        <>
          <Link
            to={`/${category}`}
            className={styles.active}
            title={localizedCategory}
            aria-label={localizedCategory}
            aria-current="page"
          >
            {localizedText}
          </Link>
          <Icons.ArrowRightIcon aria-hidden="true" />
          <span>{id}</span>
        </>
      ) : (
        <span>{localizedText}</span>
      )}
    </div>
  );
};
