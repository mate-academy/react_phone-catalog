import { Link, useParams } from 'react-router-dom';
import { toUpperCaseFirstLetter } from '../helpers/helpers';

export const NoResult: React.FC = () => {
  const { category } = useParams();

  return (
    <div className="NoResult">
      <p className="NoResult__title">
        {`${toUpperCaseFirstLetter(`${category}`)} not found`}
      </p>

      <Link to="/" className="NoResult__link">
        Go to Homepage
      </Link>
    </div>
  );
};
