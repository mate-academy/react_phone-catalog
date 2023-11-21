import { useNavigate } from 'react-router-dom';
import './BackLink.scss';

export const BackLink = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="BackLink"
      onClick={() => navigate(-1)}
      data-cy="backButton"
    >
      Back
    </button>
  );
};
