import { useParams } from 'react-router-dom';
import { toUpperCaseFirstLetter } from '../utils/helpers';

export const NoResult: React.FC = () => {
  const { category } = useParams();

  return (
    <div className="NoResult">
      {toUpperCaseFirstLetter(category || '')}
      {' '}
      not found
    </div>
  );
};
