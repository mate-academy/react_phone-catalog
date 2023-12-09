import { useEffect, useState } from 'react';
import up from '../images/icons/Chevron (Arrow Up).svg';
import down from '../images/icons/Chevron (Arrow Down).svg';
import right from '../images/icons/Chevron (Arrow Right).svg';
import left from '../images/icons/Chevron (Arrow Left).svg';

type Props = {
  direction: string,
  handler?: () => void,
  disabledButton: boolean,
};

export const ArrowButton: React.FC<Props> = ({
  direction,
  handler,
  disabledButton = false,
}) => {
  const [arrow, setArrow] = useState('');

  useEffect(() => {
    switch (direction) {
      case 'up':
        setArrow(up);
        break;

      case 'right':
        setArrow(right);
        break;

      case 'left':
        setArrow(left);
        break;
      case 'down':
        setArrow(down);
        break;

      default:
        throw new Error('none');
    }
  }, []);

  return (
    <button
      className="arrowButton"
      type="button"
      disabled={disabledButton}
      onClick={handler}
    >
      <img src={arrow} alt="" />
    </button>
  );
};
