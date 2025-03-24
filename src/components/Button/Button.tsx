import s from './Button.module.scss';
import { ButtonType } from '../../types/ButtonType';
import cl from 'classnames';

type Props = {
  direction: ButtonType;
  onClick?: () => void;
  disabled?: boolean;
  isHeart?: boolean;
  className?: string;
};

export const Button: React.FC<Props> = ({
  direction,
  onClick,
  disabled,
  isHeart,
  className,
}) => {
  const path = `img/icons/icon-${direction}.svg`;

  return (
    <button
      className={cl(s.Button, className, {
        [s.Button__heart]: isHeart,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      <img className="icon" src={path} alt={`icon-${direction}`} />
    </button>
  );
};
