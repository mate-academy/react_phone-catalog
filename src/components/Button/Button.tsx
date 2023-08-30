import { FC } from 'react';
import { Icon } from '../Icon/Icon';

import './Button.scss';

type Props = {
  dataCy?: string | null;
  className: string;
  content?: string;
  iconType?: string;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  onClick?: () => void;
};

export const Button: FC<Props> = ({
  dataCy,
  className,
  content,
  iconType = '',
  iconPosition,
  disabled,
  onClick,
}) => {
  return (
    <button
      type="button"
      data-cy={dataCy}
      className={`button button--${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {iconPosition === 'left' && iconType && <Icon type={iconType} />}
      {content}
      {iconPosition === 'right' && iconType && <Icon type={iconType} />}
    </button>
  );
};

Button.defaultProps = {
  dataCy: null,
  content: '',
  iconType: '',
  iconPosition: 'left',
  disabled: false,
  onClick: () => {},
};
