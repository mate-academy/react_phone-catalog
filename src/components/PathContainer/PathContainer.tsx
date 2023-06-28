import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import './pathContainer.scss';

interface Props {
  pathArray: string[];
}

export const PathContainer: FC<Props> = ({ pathArray }) => {
  const theme = useAppSelector(state => state.theme.value);

  return (
    <div className="path-container">
      {theme === 'light' ? (
        <Link to="/" className="path-container__back-to-home">
          <img
            src="/_new/img/icons/home-dark.svg"
            alt="Home icon"
          />
        </Link>
      ) : (
        <Link to="/" className="path-container__back-to-home">
          <img
            src="/_new/img/icons/home-light.svg"
            alt="Home icon"
          />
        </Link>
      )}

      {pathArray.map(pathName => (
        <div key={pathName} className="path-container__wrapper">
          {theme === 'light' ? (
            <span className="path-container__arrow">
              <img
                src="/_new/img/icons/arrow-right-disabled.svg"
                alt="Right arrow"
              />
            </span>
          ) : (
            <span className="path-container__arrow">
              <img
                src="/_new/img/icons/arrow-right-light.svg"
                alt="Right arrow"
              />
            </span>
          )}

          {pathName.toLowerCase() === 'phones'
            || pathName.toLowerCase() === 'tablets'
            || pathName.toLowerCase() === 'accessories' ? (
              <Link
                to={`/${pathName.toLowerCase()}`}
                className={`path-container__path-link path-container__path-link--${theme}`}
              >
                {pathName}
              </Link>
            ) : (
              <p
                className={`path-container__path-text path-container__path-text--${theme}`}
              >
                {pathName}
              </p>
            )}
        </div>
      ))}
    </div>
  );
};
