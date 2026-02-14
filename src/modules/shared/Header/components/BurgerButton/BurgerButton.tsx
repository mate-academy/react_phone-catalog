import React, { useContext } from 'react';
import styles from './BurgerButton.module.scss';
import { Close } from '../../../Icons/Close';
import { BurgerMenu } from '../../../Icons/BurgerMenu';
import { ThemeContext } from '../../../../../store/ThemeProvider';
import classNames from 'classnames';

type Props = {
  isMenuActive: boolean;
  onChangeIsMenuActive: (v: boolean) => void;
};

export const BurgerButton: React.FC<Props> = ({
  isMenuActive,
  onChangeIsMenuActive,
}) => {
  const { isThemeDark } = useContext(ThemeContext);

  return (
    <button
      className={classNames(styles.BurgerButton, {
        [styles.BurgerButton_darkTheme]: isThemeDark,
      })}
      onClick={() => onChangeIsMenuActive(!isMenuActive)}
    >
      {isMenuActive ? <Close /> : <BurgerMenu />}
    </button>
  );
};
