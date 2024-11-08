import { FC } from 'react';

import { Title } from '@ui/index';

import styles from './CatalogTitle.module.scss';

type TProps = {
  title: string;
  message: string;
};

export const CatalogTitle: FC<TProps> = ({ title, message }) => (
  <div className={styles.title}>
    <Title level={1}>{title}</Title>
    <span>{message}</span>
  </div>
);
