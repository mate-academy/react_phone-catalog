import { Link } from 'react-router-dom';
import { NoResults } from '../../components/UX/NoResults';
import { NoResultsCaseName } from '../../types/NoResultsCase';
import './page-not-found.scss';

export const PageNotFound = () => {
  return (
    <section className="page-not-found">
      <h1 className="page-not-found__title">Oooops 404!</h1>

      <div className="page-not-found__no-results">
        <NoResults
          caseName={NoResultsCaseName.PageNotFound}
        />
      </div>

      <Link
        to="/"
        className="page-not-found__go-home-button"
      >
        Take me home
      </Link>
    </section>
  );
};
