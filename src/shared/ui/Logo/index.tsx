import { NavLink } from 'react-router-dom';
import styles from './logo.module.scss';

type Props = {
  className: string;
};

export const Logo = ({ className }: Props) => {
  return (
    <NavLink to="/" className={`${className}`}>
      <img
        className={`${styles['logo-img']}`}
        src="/src/shared/icons/logo.svg"
        alt=""
        aria-hidden="true"
      />
    </NavLink>
  );
};
