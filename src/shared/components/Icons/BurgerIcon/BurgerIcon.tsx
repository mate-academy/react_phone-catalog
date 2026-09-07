import classNames from 'classnames';
import styles from './BurgerIcon.module.scss';

type Props = {
  isMenuOpen: boolean;
  onClick: () => void;
};

export const BurgerIcon: React.FC<Props> = ({ isMenuOpen, onClick }) => {
  return (
    <div
      className={classNames(styles.burger__button, {
        [styles['is-active']]: isMenuOpen,
      })}
      role="button"
      aria-label="menu"
      aria-expanded="false"
      onClick={onClick}
    >
      {/* need 4 spans for beautiful animation */}
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </div>
  );
};
