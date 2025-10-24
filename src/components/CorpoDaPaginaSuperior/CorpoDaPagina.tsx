import styles from './CorpoDaPagina.module.scss';

export const CorpoDaPagina = () => {
  return (
    <main className={styles.corpoPagina__main}>
      <h1 className={styles.corpoPagina__title}>
        {`Welcome to Nice \nGadgets store!`}
      </h1>
    </main>
  );
};
