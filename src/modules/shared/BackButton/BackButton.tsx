import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';
import { Arrow } from '../Icons/Arrow/Arrow';
import React, { useContext } from 'react';
import classNames from 'classnames';
import { ThemeContext } from '../../../store/ThemeProvider';

type Props = {
  otherClass?: string;
};

export const BackButton: React.FC<Props> = ({ otherClass }) => {
  const { isThemeDark } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <button
      className={classNames(styles.BackButton, otherClass, {
        [styles.BackButton_darkTheme]: isThemeDark,
      })}
      onClick={() => navigate(-1)}
    >
      <Arrow />
      Back
    </button>
  );
};
