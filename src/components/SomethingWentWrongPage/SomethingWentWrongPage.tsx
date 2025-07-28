import { useNavigate } from 'react-router-dom';
import styles from './SomethingWentWrongPage.module.scss';

const ReloadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#f1f2f9"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
  </svg>
);

export const SomethingWentWrongPage = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      <div className={styles.pageContent}>
        <h1 className={styles.pageInfo_title}>Something went wrong...</h1>
        <h2 className={styles.pageInfo_text}>Do you want to try again?</h2>
        <button className={styles.reloadButton} onClick={() => navigate(0)}>
          <ReloadIcon />
        </button>
      </div>
    </main>
  );
};
