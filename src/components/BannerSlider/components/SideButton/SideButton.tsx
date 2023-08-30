/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import classNames from 'classnames';
import './SideButton.scss';
import { Arrow } from '../Arrow';

type Props = {
  side: 'back' | 'next',
  handleSlide: (action: 'back' | 'next') => void,
};

export const SideButton: React.FC<Props> = ({ side, handleSlide }) => {
  const [hover, setHover] = useState(false);

  const handleChangeSlide = () => {
    handleSlide(side);
  };

  return (
    <button
      type="button"
      className={classNames('side-button', {
        'side-button--left': side === 'back',
      })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleChangeSlide}
    >
      <Arrow
        fill={hover ? '#000' : '#89939A'}
      />
    </button>
  );
};
