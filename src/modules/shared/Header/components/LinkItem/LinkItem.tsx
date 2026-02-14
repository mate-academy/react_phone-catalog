import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { ThemeContext } from '../../../../../store/ThemeProvider';
import styles from './LinkItem.module.scss';

type Props = {
  type: 'btn' | 'link';
  path: string;
  onClick?: () => void;
  children: React.ReactNode;
};

function getClassLink(
  { isActive }: { isActive: boolean },
  isThemeDark: boolean,
) {
  return classNames(styles.LinkItem, styles.LinkItem__link, {
    [styles.LinkItem_active]: isActive,
    [styles.LinkItem_darkTheme]: isThemeDark,
    [styles.LinkItem_active_darkTheme]: isActive && isThemeDark,
  });
}

function getClassBtn(
  { isActive }: { isActive: boolean },
  isThemeDark: boolean,
) {
  return classNames(styles.LinkItem, styles.LinkItem__btn, {
    [styles.LinkItem_active]: isActive,
    [styles.LinkItem_darkTheme]: isThemeDark,
    [styles.LinkItem__btn_darkTheme]: isThemeDark,
    [styles.LinkItem_active_darkTheme]: isActive && isThemeDark,
  });
}

export const LinkItem: React.FC<Props> = ({
  type,
  path,
  onClick = () => {},
  children,
}) => {
  const { isThemeDark } = useContext(ThemeContext);

  return (
    <NavLink
      to={path}
      className={navData =>
        type === 'link'
          ? getClassLink(navData, isThemeDark)
          : getClassBtn(navData, isThemeDark)
      }
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
};
