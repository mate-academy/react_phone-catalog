import s from './Button.module.scss';
import cl from 'classnames';

type Props = {
  onClick?: () => void;
  disabled?: boolean;
  isHeart?: boolean;
  className?: string;
  IconProp: React.FC<React.SVGProps<SVGSVGElement>>;
};

export const Button: React.FC<Props> = ({
  onClick,
  disabled,
  isHeart,
  className,
  IconProp,
}) => {
  return (
    <button
      className={cl(s.Button, {
        [s.Button__heart]: isHeart,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      <IconProp className={`icon ${className}`} />
    </button>
  );
};
