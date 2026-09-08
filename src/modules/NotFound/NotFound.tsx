import React from 'react';
import styles from './NotFound.module.scss';
import { useNavigate } from 'react-router-dom';

type Props = {
  title: string;
};

export const NotFound: React.FC<Props> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <main>
      <section className={styles.notFound}>
        <div className={styles.container}>
          <div className={styles.notFound__content}>
            <h2 className={styles.notFound__title}>{title}</h2>
            <button
              className={styles.notFound__btn}
              onClick={() => navigate('/')}
            >
              Go Home
            </button>
            <img
              className={styles.notFound__img}
              src="./img/product-not-found.png"
              alt="Product not found"
            />
          </div>
        </div>
      </section>
    </main>
  );
};
