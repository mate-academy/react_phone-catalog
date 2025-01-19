import { Link } from 'react-router-dom';
import styles from './LogoHeader.module.scss';

type Props = {
  isMenuOpen: boolean;
};

export const LogoHeader: React.FC<Props> = ({ isMenuOpen }) => {
  return (
    <Link to="/">
      <img
        className={`${styles.image} ${
          isMenuOpen ? styles['image--menu'] : styles['image--default']
        }`}
        alt="Nice Gadgets logo"
      />
    </Link>
  );
};
