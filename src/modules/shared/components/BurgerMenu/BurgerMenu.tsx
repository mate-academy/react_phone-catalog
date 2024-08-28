import styles from './BurgerMenu.module.scss';
import classNames from 'classnames';
import { HandleBurgerMenuLinkClick } from '../../types/handlers';
import { BurgerMenuPageLinks } from '../BurgerMenuPageLinks';
import { BurgerMenuMenuLinks } from '../BurgerMenuMenuLinks';

type Props = {
  onLinkClick: HandleBurgerMenuLinkClick;
  className?: string;
};

export const BurgerMenu: React.FC<Props> = ({ onLinkClick, className }) => {
  return (
    <nav className={classNames(styles.BurgerMenu, className)}>
      <BurgerMenuPageLinks onLinkClick={onLinkClick} />
      <BurgerMenuMenuLinks onLinkClick={onLinkClick} />
    </nav>
  );
};
