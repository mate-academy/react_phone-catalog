import { FC } from 'react';
import { Icon } from '../Icon/Icon';

import './Button.scss';

type Props = {
  content: string;
  iconType?: string;
  className: string;
  disabled?: boolean;
  event?: () => void;
};

export const Button: FC<Props> = ({
  content,
  iconType = '',
  className,
  disabled,
  event,
}) => {
  return (
    <button
      type="button"
      className={`button button--${className}`}
      disabled={disabled}
      onClick={event}
    >
      {content === 'icon'
        ? <Icon type={iconType} />
        : content}
    </button>
  );
};

Button.defaultProps = {
  iconType: '',
  disabled: false,
  event: () => {},
};
