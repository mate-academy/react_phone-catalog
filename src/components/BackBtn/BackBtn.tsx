import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icon';

type Props = {
  className?: string;
};

export const BackBtn: React.FC<Props> = ({ className = '' }) => {
  const navigate = useNavigate();

  return (
    <button
      className={`${className} back-btn`.trim()}
      type="button"
      onClick={() => navigate(-1)}
    >
      <Icon iconName="icon-arrow-left" />
      back
    </button>
  );
};
