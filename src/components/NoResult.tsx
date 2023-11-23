import { Link, useParams } from 'react-router-dom';
import { toUpperCaseFirstLetter } from '../helpers/helpers';

export const NoResult: React.FC = () => {
  const { category } = useParams();

  return (
    <div className="NoResult">
      <h1 className="NoResult__title">
        {`${toUpperCaseFirstLetter(`${category}`)} not found`}
      </h1>

      <Link to="/" className="NoResult__link">
        Go to Homepage
      </Link>
    </div>
  );
};
