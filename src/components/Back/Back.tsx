import './style.scss';
import { useNavigate } from 'react-router-dom';

export const Back = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button
      className="back"
      type="button"
      onClick={handleClick}
    >
      Back
    </button>
  );
};
