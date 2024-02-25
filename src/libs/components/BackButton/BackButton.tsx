import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import './BackButton.scss';

type Props = {
  classNames?: string,
};

export const BackButton: React.FC<Props> = ({ classNames }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button
      type="button"
      className={cn('back-button', classNames)}
      data-cy="backButton"
      onClick={handleClick}
    >
      Back
    </button>
  );
};
