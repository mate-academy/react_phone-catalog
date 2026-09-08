import { useNavigate } from 'react-router-dom';
import arrowLeftBlack from '../../images/icons/arrow-left-active.svg';

import './BackButton.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="back-button" onClick={() => navigate(-1)}>
      <img src={arrowLeftBlack} alt="Back" />
      <span className="back-button__text">Back</span>
    </div>
  );
};
