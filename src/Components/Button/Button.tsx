import classNames from 'classnames';
import { ReactNode } from 'react';
import './Button.scss';

type Props = {
  icon?: string;
  selected?: boolean;
  onClick: () => void;
  children?: ReactNode;
  disabled?: boolean;
};

export const Button: React.FC<Props> = ({
  icon,
  selected,
  onClick,
  children,
  disabled,
}) => {
  return (
    <button
      type="button"
      className={classNames('button', {
        button__primary: !icon,
        'button--disabled': disabled,
        'button__primary--selected': !icon && selected,
        button__favourite: icon === 'favourite',
        'button__item-count': icon === 'count',
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
