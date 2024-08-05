import { Link, useNavigate } from 'react-router-dom';

import './Back.scss';
import classNames from 'classnames';
import { useContext } from 'react';
import { StateContext } from '../../../utils/GlobalStateProvider';

export const Back = () => {
  const navigate = useNavigate();
  const { isDarkThemeOn } = useContext(StateContext);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div
      className={classNames('back', {
        'back-dark': !isDarkThemeOn,
      })}
    >
      <Link to=".." className="back-btn">
        {isDarkThemeOn ? (
          <img src="img/icons/arrow.svg" alt="" />
        ) : (
          <img src="img/icons/arrow-dark.svg" alt="" />
        )}
      </Link>
      <a onClick={goBack} className="back-link">
        Back
      </a>
    </div>
  );
};
