import './BackButton.scss';
import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className="back" onClick={handleClick}>
      <div className="icon icon-left" />
      <p className="back-text">Back</p>
    </div>
  );
};
