import styles from './ThankYouPage.module.scss';

export const ThankYouPage = () => {
  return (
    <div className={styles.wrapper}>
      <img
        src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2JqcnB3dzl1Mm1pNmo5NWhpZWxkbXF1aGN2dWNvM2NreTBhd3RyaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/M9NbzZjAcxq9jS9LZJ/giphy.gif"
        alt="gif thanks"
        className={styles.gif}
      />
    </div>
  );
};
