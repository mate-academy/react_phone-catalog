/* eslint-disable react/jsx-one-expression-per-line */

import { Link } from 'react-router-dom';

type Props = {
  category: string;
};

export const NoResults: React.FC<Props> = ({ category }) => {
  return (
    <div className="no-results">
      <h2 className="no-results__title">
        {category[0].toLocaleUpperCase() + category.slice(1)} not found
      </h2>
      <Link
        to="/"
        className="no-results__link icon-button"
      >
        Go Home
      </Link>
    </div>
  );
};
