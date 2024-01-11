import { Link } from 'react-router-dom';
import { ICONS } from '../../icons';
import './BackButton.scss';

export const BackButton: React.FC = () => {
  return (
    <Link
      to="../"
      className="back-button"
    >
      <img
        src={ICONS.arrowLeft}
        alt="button back"
        className="back-button__icon"
      />
      <span className="back-button__text">Back</span>
    </Link>
  );
};
