import { NavLink } from 'react-router-dom';
import styles from './NavigationButton.module.scss';

type Props = {
  children: React.ReactNode;
  href: string;
};

export const NavigationButton: React.FC<Props> = ({ children, href }) => {
  return (
    <NavLink to={href} className={styles.Link}>
      {children}
    </NavLink>
  );
};
