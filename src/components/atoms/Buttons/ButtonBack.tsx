import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icon/Icon';
import { ICONS } from '../../../constants/icons';
import { Typography } from '../Typography/Typography';

export const ButtonBack: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <button
      onClick={handleBack}
      className="group"
    >
      <div className="flex gap-1 items-center hover:scale-110 hover:cursor-pointer origin-left transition-transform duration-300 ease-in-out group-hover:scale-110">
        <Icon
          src={ICONS.ARROW.LEFT}
          isDisabled={true}
          className="group-hover:bg-primary dark:bg-white dark:group-hover:bg-accent-dark transition-colors duration-300"
        />
        <Typography
          level="small"
          className="text-secondary dark:text-white group-hover:text-primary duration-300 dark:group-hover:text-accent-dark"
        >
          Back
        </Typography>
      </div>
    </button>
  );
};
