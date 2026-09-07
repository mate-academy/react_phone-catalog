import { useNavigate } from 'react-router-dom';
import styles from './EmptyPage.module.scss';

type Props = {
  title?: string;
  text?: string;
};

export const EmptyPage = ({ title = '', text = '' }: Props) => {
  const navigate = useNavigate();
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.pageContent}>
        <div className={styles.pageInfo_link} onClick={() => handleBack()}>
          <span>&lt;</span>
          <span>Back</span>
        </div>
        <h1 className={styles.pageInfo_title}>{title}</h1>
        <h2 className={styles.pageInfo_text}>{text}</h2>
      </div>
    </main>
  );
};
