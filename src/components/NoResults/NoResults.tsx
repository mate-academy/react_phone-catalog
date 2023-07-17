import { useNavigate } from 'react-router-dom';
import './NoResults.scss';

export const NoResults = () => {
  const navigate = useNavigate();

  return (
    <div className="noresults">
      <div className="noresults__title">Products can not be found</div>
      <button
        className="noresults__button"
        type="button"
        onClick={() => navigate('/')}
      >
        Go Home
      </button>
    </div>
  );
};
