import {
  useCallback,
  useState,
  useEffect,
} from 'react';
import debounce from 'lodash.debounce';
import { Link } from 'react-router-dom';
import { ICONS } from '../icons';
import { Loader } from '../components/Loader';

export const TabletsPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const loaded = useCallback(
    debounce(setIsLoading, 1000),
    [],
  );

  useEffect(() => {
    loaded(!isLoading);
  }, []);

  return (
    <div className="container">
      <div className="tablets-page App__tablets-page">
        <div className="page-navigation">
          <Link to="/" className="page-navigation__link">
            <img src={ICONS.home_icon} alt="to home page" className="icon" />
          </Link>

          <img src={ICONS.arrow} alt="icon" className="icon icon--right" />

          <p
            className="page-navigation__text"
          >
            Tablets
          </p>
        </div>

        <div className="tablets-page__title">
          <h1 className="title title--h1">Tablets Page</h1>
        </div>

        {isLoading && <Loader />}

        {!isLoading && (
          <h2 className="title title--h2 title--empty-page">
            <strong>This page is under development</strong>
          </h2>
        )}
      </div>
    </div>
  );
};
