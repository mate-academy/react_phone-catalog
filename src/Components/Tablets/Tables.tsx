import { Link } from 'react-router-dom';
import styles from './Tables.module.scss';

export const Tables = () => {
  return (
    <div>
      <div className="link-block">
        <Link to={`/`}>
          <img src="img/icons/home_icon.svg" alt="home" />
        </Link>
        <span>
          <img src="img/icons/Arrow_Right.svg" alt="arow_left" />
        </span>
        <Link to={`/tables`}>Tables</Link>
      </div>
      <h1 className={styles.title}>Tables Page</h1>
    </div>
  );
};
