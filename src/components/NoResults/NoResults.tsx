import { Link } from 'react-router-dom';

import './NoResults.scss';

type Props = {
  category?: string;
};

export const NoResults: React.FC<Props> = ({ category = '' }) => (
  <div className="NoResults">
    <h1 className="NoResults__title">Oops!</h1>

    <p className="NoResults__paragpraph">
      {category ? (
        `Seems like we don't have any ${category.toLowerCase()} right now.`
      ) : (
        'Seems like there are no products in this section right now.'
      )}
    </p>

    <Link to="/" className="NoResults__button">
      Go to homepage
    </Link>
  </div>
);
