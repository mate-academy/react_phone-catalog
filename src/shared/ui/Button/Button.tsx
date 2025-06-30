import style from './Button.module.scss';
import { Icons } from '../../ui/Icons/Icons';
import classNames from 'classnames';
import { ButtonProps } from '../../../types/buttons';

export const Button: React.FC<ButtonProps> = ({
  iconId,
  directions,
  onClick,
  filled,
  type,
  className,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        style.button,
        type && style[type],
        className && className,
      )}
      disabled={disabled}
    >
      <Icons id={iconId} directions={directions} filled={filled} />
    </button>
  );
};
