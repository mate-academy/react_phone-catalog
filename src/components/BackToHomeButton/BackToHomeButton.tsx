import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import './backToHome.scss';

export const BackToHomeButton: FC = () => {
  const theme = useAppSelector(state => state.theme.value);

  return (
    <Link to="/" className="back-to-home">
      <span className='back-to-home__arrow'>
        {theme === 'light' ? (
          <img
            src="/_new/img/icons/arrow-left-dark.svg"
            alt="Back to home button"
          />
        ) : (
          <img
            src="/_new/img/icons/arrow-left-light.svg"
            alt="Back to home button"
          />
        )}
      </span>
      <h3 className="back-to-home__link">
        Back
      </h3>
    </Link>
  );
};
