import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

// Styles
import './BackButton.scss';

export const BackButton: FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="BackButton"
      onClick={() => {
        navigate(-1);
      }}
    >
      Back
    </button>
  );
};
