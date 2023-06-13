import './ButtonBack.scss';

import { useNavigate } from 'react-router-dom';

export const ButtonBack: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="button-back"
      onClick={() => navigate(-1)}
    >
      <img
        src="_new/img/icons/arrow_left.svg"
        alt="arrow left"
      />
    </button>
  );
};
