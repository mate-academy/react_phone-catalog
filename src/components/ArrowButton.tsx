import { useEffect, useState } from 'react';
import up from '../imgs/icons/Chevron (Arrow Up).svg';
import down from '../imgs/icons/Chevron (Arrow Down).svg';
import right from '../imgs/icons/Chevron (Arrow Right).svg';
import left from '../imgs/icons/Chevron (Arrow Left).svg';

type Props = {
  direction: string,
  handler?: () => void,
};

export const ArrowButton: React.FC<Props> = ({ direction, handler }) => {
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
      onClick={handler}
    >
      <img src={arrow} alt="" />
    </button>
  );
};
