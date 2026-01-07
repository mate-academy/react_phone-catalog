import styles from './CategoriesEmpty.module.scss';

export const CategoriesEmpty = () => {
  return (
    <div className={styles.categories}>
      <h2 className={styles.categories_title}></h2>

      <div className={styles.categories_cards}>
        <div className={styles.card}>
          <div className={styles.image_conteiner} />

          <div className={styles.description}>
            <div className={styles.card_title}></div>
            <div className={styles.card_models}></div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.image_conteiner} />

          <div className={styles.description}>
            <div className={styles.card_title}></div>
            <div className={styles.card_models}></div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.image_conteiner} />

          <div className={styles.description}>
            <div className={styles.card_title}></div>
            <div className={styles.card_models}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
