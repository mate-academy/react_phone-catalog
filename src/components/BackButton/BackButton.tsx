import { useNavigate } from 'react-router-dom';
import './BackButton.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <button
      type="button"
      className="back-button"
      onClick={goBack}
    >
      <div className="icon icon--arrow-left" />
      <p className="back-button__text">Back</p>
    </button>
  );
};
