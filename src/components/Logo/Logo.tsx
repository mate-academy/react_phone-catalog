import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './Logo.module.scss';

type Props = {
  bigLogo?: boolean;
  onClick?: () => void;
};

export const Logo: React.FC<Props> = ({ bigLogo = false, onClick }) => (
  <Link to="/">
    <button type="button" onClick={onClick}>
      <div className={cn(styles.Logo, { [styles['Logo--big']]: bigLogo })}>
        <img src="img/icons/Logo.png" className={styles.Logo__img} alt="Logo" />
      </div>
    </button>
  </Link>
);
