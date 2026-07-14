import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.wrapper}>
      <img
        src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmdqNzUzdTM5M3V5Yzg1Z2s2NGs2eTg3bGk4aHVpeDAxYmtjOWN1YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/14uQ3cOFteDaU/giphy.gif"
        alt="404 page gif"
        className={styles.gif}
      />
    </div>
  );
};
