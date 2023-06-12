import classNames from 'classnames';
import leftArrow from '../../assets/l_arrow.svg';
import rightArrow from '../../assets/r_arrow.svg';

import './Button.scss';

type ButtonProps = {
  onClick: () => void;
  isDisabled: boolean;
  arrow: 'left' | 'right';
  alt: string;
  size: 'small' | 'big';
};

export const Button = ({
  onClick,
  isDisabled,
  arrow,
  alt,
  size,
}: ButtonProps) => {
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
