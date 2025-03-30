import { useNavigate } from 'react-router-dom';

export const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="nav-container">
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="nav-container__button"
      >
        <div className="nav-container__arrow" />

        <p className="nav-container__text">Back</p>
      </button>
    </div>
  );
};
