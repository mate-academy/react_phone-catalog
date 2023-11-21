import { ReactSVG } from 'react-svg';
import './BackButton.scss';
import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="back">
      <button
        type="button"
        className="back-button"
        aria-label="back-button"
        id="back-button"
        onClick={() => navigate(-1)}
      >
        <ReactSVG
          src="img/icons/Chevron (Arrow Left).svg"
        />
      </button>

      <label
        htmlFor="back-button"
        className="back-label"
      >
        Back
      </label>
    </div>
  );
};
