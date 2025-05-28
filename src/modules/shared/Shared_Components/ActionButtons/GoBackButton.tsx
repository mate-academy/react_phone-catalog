import classNames from 'classnames';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../../../../Store/StoreThemeMode';

export const GoBackButton = () => {
  const navigate = useNavigate();
  const { isDark } = useContext(DarkModeContext);

  return (
    <div className="nav-container">
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="nav-container__button"
      >
        <div
          className={classNames('nav-container__arrow', {
            'nav-container__arrow--is-Dark': isDark,
          })}
        />

        <p
          className={classNames('nav-container__text', {
            'nav-container__text--is-Dark': isDark,
          })}
        >
          Back
        </p>
      </button>
    </div>
  );
};
