import style from './Button.module.scss';
import { Icons } from '../../ui/Icons/Icons';
import classNames from 'classnames';
import { ButtonProps } from '../../../types/buttons';
import { NavLink } from 'react-router-dom';

export const LinkButton: React.FC<ButtonProps> = ({
  iconId,
  directions,
  children,
  type,
  className,
  to,
  disabled,
}) => {
  return (
    <NavLink
      className={classNames(
        style.button,
        type && style[type],
        className && className,
      )}
      to={'' + to}
      aria-disabled={disabled}
    >
      {iconId ? <Icons id={iconId} directions={directions} /> : children}
    </NavLink>
  );
};
