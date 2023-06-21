import classNames from 'classnames';
import leftArrow from '../../assets/svg/l_arrow.svg';
import rightArrow from '../../assets/svg/r_arrow.svg';

import './ArrowButton.scss';

type ArrowButtonProps = {
  onClick: () => void;
  isDisabled: boolean;
  arrow: 'left' | 'right';
  alt: string;
  size: 'small' | 'big';
};

export const ArrowButton = ({
  onClick,
  isDisabled,
  arrow,
  alt,
  size,
}: ArrowButtonProps) => {
  return (
    <button
      className={classNames('button', {
        'button--size-b': size === 'big',
      })}
      type="button"
      onClick={onClick}
      disabled={isDisabled}
    >
      <img
        className="button__icon"
        src={arrow === 'left' ? leftArrow : rightArrow}
        alt={alt}
      />
    </button>
  );
};
