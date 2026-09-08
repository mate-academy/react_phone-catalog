import { useNavigate } from 'react-router-dom';
import './Back.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="back__navigation" onClick={() => navigate(-1)}>
      <div className="icon__back"></div>
      <span className="text__back">Back</span>
    </div>
  );
};
