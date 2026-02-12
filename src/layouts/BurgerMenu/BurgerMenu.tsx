import classNames from 'classnames';
import styles from './BurgerMenu.module.scss';
import { Navigation } from '../../components/Navigation';
import { useBurgerMenu } from '../../utils/hooks/Context/useBurgerMenu';

export const BurgerMenu = () => {
  const { isOpen } = useBurgerMenu();

  return (
    <aside
      className={classNames('page__menu', [styles['burger-menu']], {
        'page__menu--is-open': isOpen,
      })}
      // onClick={onClose}
    >
      <Navigation isMobile={true} />
    </aside>
  );
};
