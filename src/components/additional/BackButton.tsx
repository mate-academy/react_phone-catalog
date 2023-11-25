import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      data-cy="backButton"
      className="back-button"
      type="button"
      onClick={() => navigate(-1)}
    >
      <img
        className="back-button__img"
        src="img/icons/backButton.png"
        alt="back"
      />
      Back
    </button>
  );
};
