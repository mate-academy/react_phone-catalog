import { useNavigate } from 'react-router-dom';
import './BackButton.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('..');
  };

  return (
    <div className="back" onClick={handleClick}>
      <div className="icon icon-left" />
      <p className="back-text">Back</p>
    </div>
  );
};
