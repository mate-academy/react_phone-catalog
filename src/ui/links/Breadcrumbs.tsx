import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { HomeIcon } from '@ui/icon/HomeIcon';
import { ArrowRightIcon } from '@ui/icon/ArrowRightIcon';

import { ROUTES } from '@utils/constants/routes';

import { regProducts } from '@utils/constants/regProducts';
import { getUpperCaseFirstLetter } from '@utils/helpers/getUpperCaseFirstLetter';

import styles from './breadcrumb.module.scss';

type TProps = {
  text?: string;
  id?: string;
  category?: string;
};

export const Breadcrumbs: FC<TProps> = ({ text = '', id, category }) => {
  const { pathname } = useLocation();

  const regIsActive = regProducts.test(pathname);

  const upperCaseFirstLetter = getUpperCaseFirstLetter(text);

  return (
    <div className={styles.links}>
      <Link to={ROUTES.HOME} title="Go to the home page">
        <HomeIcon />
      </Link>
      <ArrowRightIcon />

      {regIsActive && category ? (
        <>
          <Link
            to={`/${ROUTES.CATEGORIES}/${category}`}
            className={styles.active}
            title={`Go to the ${category} page`}
          >
            {upperCaseFirstLetter}
          </Link>
          <ArrowRightIcon />
          <p>{id}</p>
        </>
      ) : (
        <p>{upperCaseFirstLetter}</p>
      )}
    </div>
  );
};
