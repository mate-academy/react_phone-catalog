import React, { useContext } from 'react';
import styles from './SliderButton.module.scss';
import { ThemeContext } from '../../../store/ThemeProvider';
import classNames from 'classnames';

type Props = {
  onClick: () => void;
  isDisabled?: boolean;
  children: React.ReactNode;
};

export const SliderButton: React.FC<Props> = ({
  onClick,
  isDisabled = false,
  children,
}) => {
  const { isThemeDark } = useContext(ThemeContext);

  return (
    <button
      className={classNames(styles.SliderButton, {
        [styles.SliderButton_darkTheme]: isThemeDark,
      })}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};
