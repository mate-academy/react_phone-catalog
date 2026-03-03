import './../../../../styles/global.scss';
import styles from './Title.module.scss';
import { FC } from 'react';

type Props = {
  title: string;
  amountPage?: number;
};

export const Title: FC<Props> = ({ title, amountPage }) => {
  return (
    <>
      <h1
        className={amountPage >= 0 ? styles.h1__title : styles.h1__title__small}
      >
        {title}
      </h1>
      {amountPage > 0 && <p className={styles.text}>{amountPage} models</p>}
    </>
  );
};
