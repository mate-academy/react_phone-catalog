import { FC } from 'react';
import { useIconSrc } from '../../../../utils/hooks/useIconSrc';
import { useMenu } from '../../../../contexts/MenuProvider';
import classNames from 'classnames';
import styles from './MenuButton.module.scss';

export const MenuButton: FC = () => {
  const { isOpen, toggleMenu } = useMenu();
  const { menuUrl, closeUrl } = useIconSrc();

  return (
    <button
      type="button"
      className={classNames(styles.themeButton, styles.showMenuButton)}
      onClick={toggleMenu}
    >
      <img
        src={isOpen ? closeUrl : menuUrl}
        alt="Menu button"
        className={styles.hoverImg}
      />
    </button>
  );
};
