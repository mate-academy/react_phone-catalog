import { useNavigate } from 'react-router-dom';
import { Icons } from '../../types/enums/Icons';
import { Icon } from '../Icon';
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
      <Icon icon={Icons.ArrowLeft} />
      <p className="back-button__text">
        Back
      </p>
    </button>
  );
};
