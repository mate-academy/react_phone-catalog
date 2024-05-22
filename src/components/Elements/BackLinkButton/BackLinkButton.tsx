import './BackLinkButton.scss';
import { useNavigate } from 'react-router-dom';

export const BackLinkButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <button onClick={handleBackClick} className="link-back">
      <i className="icon icon--arrow-left"></i>
      Back
    </button>
  );
};
