import styles from './BurgerMenu.module.scss';
import classNames from 'classnames';
import { BurgerMenuPageLinks } from '../BurgerMenuPageLinks';
import { BurgerMenuMenuLinks } from '../BurgerMenuMenuLinks';

type Props = {
  className?: string;
};

export const BurgerMenu: React.FC<Props> = ({ className }) => {
  return (
    <nav className={classNames(styles.BurgerMenu, className)}>
      <BurgerMenuPageLinks />
      <BurgerMenuMenuLinks />
    </nav>
  );
};
