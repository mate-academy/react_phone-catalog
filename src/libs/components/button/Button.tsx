import classNames from 'classnames';

import './styles.scss';

import { Icon } from '../icon/Icon';
import { IconOptionsType } from '../../types';
import { ButtonViews, IconColors, IconNames } from '../../enums';

type Props = {
  className?: string;
  icon?: IconNames;
  iconOptions?: IconOptionsType
  view?: ButtonViews,
  disabled?: boolean;
  selected?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
};

export const Button: React.FC<Props> = ({
  className,
  icon,
  iconOptions,
  view = ButtonViews.DEFAULT,
  disabled = false,
  selected = false,
  onClick = () => { },
  children,
  ...rest
}) => {
  const options = disabled
    ? { ...iconOptions, color: IconColors.LIGHT_GREY }
    : iconOptions;

  return (
    <div className={classNames(className, 'button', view, {
      [ButtonViews.SELECTED]: selected,
    })}
    >
      <button
        className="button__btn"
        type="button"
        onClick={onClick}
        disabled={disabled}
        {...rest}
      >
        {children}
        {icon && (
          <Icon icon={icon} options={options} />
        )}
      </button>
    </div>
  );
};
