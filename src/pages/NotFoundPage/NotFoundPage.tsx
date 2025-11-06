import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate('/');
  }, 5000);

  return (
    <div className={styles.notFoundPage}>
      <div className="container">
        <p className="errorMessage">
          Page not found. You will shortly be redirected to homepage
        </p>
        <img
          src="/public/img/page-not-found.png"
          alt="page not found"
          className="errorImg"
        />
      </div>
    </div>
  );
};
