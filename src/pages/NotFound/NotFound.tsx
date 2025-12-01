// src/pages/NotFound/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound: React.FC = () => {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>404 - Página não encontrada</h1>
      <p className={styles.text}>
        O endereço que você tentou acessar não existe.
      </p>
      <Link to="/" className={styles.backLink}>
        Voltar para a Home
      </Link>
    </main>
  );
};

export default NotFound;
