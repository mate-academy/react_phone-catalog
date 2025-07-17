import { useNavigate } from 'react-router-dom';
import './ButtonBack.scss';
import { ArrowIcon } from '../../IconsSVG/ArrowIcon';

export const ButtonBack = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // повертає на попередню сторінку
  };

  return (
    <button onClick={handleGoBack} className="button-back">
      <ArrowIcon disabled={false} />
      <span>Back</span>
    </button>
  );
};
