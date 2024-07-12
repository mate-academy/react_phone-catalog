import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

type Props = {
  onClick?: () => void;
};

export const Logo: React.FC<Props> = ({ onClick }) => (
  <Link to="/">
    <button type="button" onClick={onClick}>
      <div className={styles.Logo}>
        <img src="img/icons/Logo.png" className={styles.Logo__img} alt="Logo" />
      </div>
    </button>
  </Link>
);
