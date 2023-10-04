import './ReferenceBack.scss';
import { useNavigate } from 'react-router-dom';
import PreviousGroupIcon from '../SliderIconPrevious/PreviousGroupIcon';

export const ReferenceBack = () => {
  const navigate = useNavigate();

  return (
    <div className="referenceBack">
      <PreviousGroupIcon />
      <button
        className="referenceBack__button"
        type="button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
};
