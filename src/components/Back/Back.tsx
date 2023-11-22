import './Back.scss';

import { useNavigate } from 'react-router-dom';

export const Back: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="Back" data-cy="backButton">
      <button
        type="button"
        className="Back__button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
};
