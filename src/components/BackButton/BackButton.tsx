import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="back-button"
      data-cy="backButton"
      onClick={() => navigate(-1)}
    >
      Back
    </button>
  );
};
