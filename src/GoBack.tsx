import { useNavigate } from 'react-router';

export const GoBack = () => {
  const history = useNavigate();

  return (
    <div className="goGack">
      <div className="goGack__arrow" />
      <button
        type="button"
        data-cy="backButton"
        aria-label="Go back"
        className="goGack__button"
        onClick={() => history(-1)}
      >
        Back
      </button>
    </div>
  );
};
