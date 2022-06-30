import { useNavigate } from 'react-router-dom';

import './Back.scss';

export const Back = () => {
  const navigate = useNavigate();

  return (
    <button
      className="Back"
      type="button"
      onClick={() => navigate(-1)}
    >
      Back
    </button>
  );
};
