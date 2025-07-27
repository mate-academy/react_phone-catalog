import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

type Props = {
  firstPath: string;
  secondPath: string;
};

export const Breadcrumbs = ({ firstPath, secondPath }: Props) => {
  return (
    <div className={styles.breadcrumbs}>
      <Link className={styles.breadcrumbs__link} to={'/'}>
        <img src="./icons/Home.svg" alt="home icon" />
      </Link>
      <img src="./icons/ArrowRight.svg" alt="arrow right icon" />
      <Link to={`/${firstPath}`} className={styles.breadcrumbs__text}>
        {firstPath}
      </Link>
      {secondPath ? (
        <>
          <img src="./icons/ArrowRight.svg" alt="arrow right icon" />
          <p className={styles.breadcrumbs__text}>{secondPath}</p>
        </>
      ) : null}
    </div>
  );
};
