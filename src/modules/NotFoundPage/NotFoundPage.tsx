import React from 'react';

import { useTheme } from '../../hooks';
import { ThemeType } from '../../types';

import { BackButton, InfoMessage } from '../../components';

import notFoundPageImgLight from '../../assets/page-not-found-light.png';
import notFoundPageImgDark from '../../assets/page-not-found-dark.png';

import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <main className={styles['not-found-page']}>
      <section className={styles['not-found-page__content']}>
        <BackButton className={styles['not-found-page__back-button']} />
        <h1 className={styles['not-found-page__title']}>Page not found</h1>
        <InfoMessage
          title="The page you're looking for doesn’t exist or has been moved."
          image={
            theme === ThemeType.Light
              ? notFoundPageImgLight
              : notFoundPageImgDark
          }
          className={styles['not-found-page__message']}
        />
      </section>
    </main>
  );
};
