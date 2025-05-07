import React, { useContext } from 'react';
import classNames from 'classnames';
import styles from './PaginationButton.module.scss';
import { ThemeContext } from '../../../store/ThemeProvider';

type Props = {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
};

export const PaginationButton: React.FC<Props> = ({
  onClick,
  isActive = false,
  children,
}) => {
  const { isThemeDark } = useContext(ThemeContext);

  return (
    <button
      className={classNames(styles.PaginationButton, {
        [styles.PaginationButton_active]: isActive,
        [styles.PaginationButton_darkTheme]: isThemeDark,
        [styles.PaginationButton_active_darkTheme]: isActive && isThemeDark,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
