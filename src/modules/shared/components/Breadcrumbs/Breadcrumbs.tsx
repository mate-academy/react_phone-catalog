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
        <img src="public/icons/Home.svg" alt="home icon" />
      </Link>
      <img src="public/icons/ArrowRight.svg" alt="arrow right icon" />
      <p className={styles.breadcrumbs__text}>{firstPath}</p>
      {secondPath ? (
        <>
          <img src="public/icons/ArrowRight.svg" alt="arrow right icon" />
          <p className={styles.breadcrumbs__text}>{secondPath}</p>
        </>
      ) : null}
    </div>
  );
};
