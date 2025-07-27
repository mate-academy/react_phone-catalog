import { useThemeState } from '../../stateManagers/themeState';
import './ButtonArrow.scss';
import cn from 'classnames';

type IconType = 'arrow' | 'plus' | 'minus';
type Direction = 'left' | 'right' | 'up' | 'down';

interface ButtonArrowProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconType;
  direction?: Direction;
}

export const ButtonArrow: React.FC<ButtonArrowProps> = ({
  icon,
  direction,
  disabled = false,
  className,
  ...props
}) => {
  const { theme } = useThemeState();
  const btnClass = cn(
    'button-icon',
    `button-icon--${icon}`,
    icon === 'arrow' && direction && direction,
    `button-icon--${theme}`,
    { 'is-disabled': disabled },
    className,
  );

  return (
    <button
      className={btnClass}
      disabled={disabled}
      {...props}
    >
      <span className="button-icon__icon" />
    </button>
  );
};
