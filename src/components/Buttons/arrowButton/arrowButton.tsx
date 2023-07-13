import { useEffect, useState } from 'react';
import up from '../../../imgs/icons/arrow-up.svg';
import right from '../../../imgs/icons/arrow-right.svg';
import left from '../../../imgs/icons/arrow-left.svg';

import './arrowButton.scss';

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

      default:
        throw new Error('gfledcs');
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
