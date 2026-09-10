import classNames from 'classnames';
import styles from './ColorButton.module.scss';
import { NavLink } from 'react-router-dom';

interface Props {
  color: string;
  to: string;
}

export const ColorButton = ({ to, color }: Props) => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.colorButton, styles[color], {
      [styles.active]: isActive,
    });

  return <NavLink to={to} className={getLinkClass} />;
};
