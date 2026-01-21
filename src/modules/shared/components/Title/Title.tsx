import './../../../../styles/global.scss';
import styles from './Title.module.scss';
import { FC } from 'react';

type Props = {
  title: string;
};

export const Title: FC<Props> = ({ title }) => {
  return (
    <>
      <h1 className={styles.h1__title}>{title}</h1>
      <p className={styles.text}>95 models</p>
    </>
  );
};
