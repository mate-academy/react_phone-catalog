import { useNavigate } from 'react-router-dom';
import './BackButton.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button className="back-button button--text" onClick={handleClick}>
      <img src="icons/arrow_left.svg" alt="Arrow left" />

      <p className="back-button__text small-text">Back</p>
    </button>
  );
};
