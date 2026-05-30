import React from 'react';
import classNames from 'classnames';

import { useTheme } from '../../../../hooks';
import { ThemeType } from '../../../../types';
import { BackButton, InfoMessage } from '../../../../components';

import notFoundImgLight from '../../../../assets/product-not-found-light.png';
import notFoundImgDark from '../../../../assets/product-not-found-dark.png';

import styles from './ProductNotFound.module.scss';

type Props = {
  className?: string;
};

export const ProductNotFound: React.FC<Props> = ({ className }) => {
  const { theme } = useTheme();

  return (
    <section className={classNames(styles['not-found'], className)}>
      <BackButton className={styles['not-found__back-button']} />
      <h2 className={styles['not-found__title']}>Product not found</h2>
      <InfoMessage
        title="We couldn't find any product matching your request."
        image={theme === ThemeType.Light ? notFoundImgLight : notFoundImgDark}
        className={styles['not-found__message']}
      />
    </section>
  );
};
