import React from 'react';
import styles from './PageMessage.module.scss';
import { Typography } from '../../atoms/Typography';

type Props = {
  title: string;
  subtitle?: string;
  imgSrc?: string;
};

export const PageMessage: React.FC<Props> = ({
  title,
  subtitle,
  imgSrc = 'images/no-items.png',
}) => (
  <div className={styles.content}>
    <div className={styles.content__image}>
      <img className={styles.content__image__img} src={imgSrc} alt="" />
    </div>
    <Typography variant="h1" tag="h2" className={styles.content__message}>
      {title}
    </Typography>
    {subtitle && (
      <Typography variant="h1" className={styles.content__message}>
        {subtitle}
      </Typography>
    )}
  </div>
);
