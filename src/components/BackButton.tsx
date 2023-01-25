import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft }
  from '../assets/images/icons/arrow-left.svg';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="BackButton"
    >
      <ArrowLeft className="BackButton__arrow" />
      Back
    </button>
  );
};

export default BackButton;
