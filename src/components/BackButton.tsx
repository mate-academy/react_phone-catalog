import { useNavigate } from 'react-router-dom';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      data-cy="backButton"
      className="back-button"
      type="button"
      onClick={() => navigate(-1)}
    >
      <div className="back-button__vector" />
      <span className="back-button__title">
        Back
      </span>
    </button>
  );
};
