import React from 'react';

import styles from './PageTop.module.scss';
import { Accessories } from '../../../../types/Accessories';
import { Phones } from '../../../../types/Phones';
import { Tablets } from '../../../../types/Tablets';
import { Link, useLocation } from 'react-router-dom';
import { titleText } from '../../../../utils/titleText';
import { HomeSvg } from '../../../shared/svg/HomeSvg';
import { ArrowRightSvg } from '../../../shared/svg/ArrowRightSvg';
import { ArrowLeftSvg } from '../../../shared/svg/ArrowLeftSvg';

type Props = {
  product: Accessories | Phones | Tablets;
};

export const PageTop: React.FC<Props> = ({ product }) => {
  const { state } = useLocation();

  return (
    <>
      <div className={styles.rout}>
        <Link to={'/'} className={styles.icon}>
          <HomeSvg color="var(--home-svg-color)" />
        </Link>

        <ArrowRightSvg color="var(--disable-arrow-svg)" />

        <Link to={`/${product.category}`} className={styles.link}>
          {titleText(product.category)}
        </Link>

        <ArrowRightSvg color="var(--disable-arrow-svg)" />

        <span className={styles.currentPage}>{product.name}</span>
      </div>

      <Link to={state || '/'} className={styles.back}>
        <ArrowLeftSvg color="var(--active-arrow-svg)" />
        Back
      </Link>

      <h2 className={styles.title}>{product.name}</h2>
    </>
  );
};
