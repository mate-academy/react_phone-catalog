import { useLocation } from 'react-router-dom';
import './NoResults.scss';

export const NoResults = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <h1 className="page__notification NoResults">
      {`${path[1].toUpperCase() + path.slice(2)} not found`}
    </h1>
  );
};
