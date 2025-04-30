import { useNavigate } from 'react-router-dom';
import styles from './PageNotFoundContent.module.scss';

export const PageNotFoundContent = () => {
  const navigate = useNavigate();

  return (
    <>
      <span onClick={() => navigate(-1)} className="App__link">
        Back
      </span>
      <div className={styles.pnf__img_container}>
        {' '}
        <img
          className={styles.pnf__image}
          src="/img/page-not-found.png"
          alt="Nice Gadgets"
        />
      </div>
    </>
  );
};
