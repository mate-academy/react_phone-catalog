import { useContext } from 'react';
import './BackBtn.scss';
import { useNavigate } from 'react-router-dom';
import {
  ThemeContext,
  ThemeType,
} from '../../../contexts/ThemeContext/ThemeContext';
import { getIconSrc } from '../../../helpers/getIconSrc';
import classNames from 'classnames';

export const BackBtn = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <button className="back-btn" onClick={() => navigate(-1)}>
      <img
        src={getIconSrc('arrow-prev', theme)}
        className="icon back-btn__detail"
      />
      <span
        className={classNames('back-btn__text small-text', {
          dark: theme === ThemeType.DARK,
        })}
      >
        Back
      </span>
    </button>
  );
};
