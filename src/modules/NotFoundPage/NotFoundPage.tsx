import { Link } from 'react-router-dom';
import BtnBack from '../../components/BtnBack/BtnBack';
import styles from './NotFoundPage.module.scss';
import errorImg from '../../assets/images/page-not-found.png';

const NotFoundPage = () => {
  return (
    <div className={styles.page}>
      <BtnBack />
      <h2 className={styles.title}>
        Page was not found. Would you like to go to Home page
      </h2>
      <Link to="/" className={styles.link}>
        <button className={styles.btn}> Go home</button>
      </Link>
      <img src={errorImg} alt="" />
    </div>
  );
};

export default NotFoundPage;
