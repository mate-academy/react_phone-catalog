import { Link } from 'react-router-dom';
import styles from './Accessories.module.scss';

export const Accessories = () => {
  return (
    <div>
      <div className="link-block">
        <Link to={`/`}>
          <img src="img/icons/home_icon.svg" alt="home" />
        </Link>
        <span>
          <img src="img/icons/Arrow_Right.svg" alt="arow_left" />
        </span>
        <Link to={`/smart`}>Accessories</Link>
      </div>
      <h1 className={styles.title}>Accessories page</h1>
    </div>
  );
};
