import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { HomeIcon } from '@ui/icon/HomeIcon';
import { ArrowRightIcon } from '@ui/icon/ArrowRightIcon';
import { ROUTES } from '@utils/constants/routes';

import { getUpperCaseFirstLetter } from '@utils/helpers/getUpperCaseFirstLetter';

import styles from './breadcrumb.module.scss';

type TProps = {
  text?: string;
  id?: string;
};

export const Breadcrumbs: FC<TProps> = ({ text, id }) => {
  const { pathname } = useLocation();

  const regIsActive = /\/(phones|tablets|accessories)\//.test(pathname);

  const upperCaseText = text ? getUpperCaseFirstLetter(text) : '';

  return (
    <div className={styles.links}>
      <Link to={ROUTES.HOME}>
        <HomeIcon />
      </Link>
      <ArrowRightIcon />

      <Link to={'..'} className={regIsActive ? styles.active : styles.offline}>
        {upperCaseText}
      </Link>

      {regIsActive && (
        <>
          <ArrowRightIcon />
          {id}
        </>
      )}
    </div>
  );
};
