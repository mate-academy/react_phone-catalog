import cn from "classnames";
import { ReactNode } from "react";

type Props= {
  icon?: string,
  selected?: boolean,
  onClick: () => void,
  children?: ReactNode,
  disabled?: boolean,
}

export const Button: React.FC<Props> = ({
  icon,
  selected,
  onClick,
  children,
  disabled,
}) => {
  return (
    <button
      className={cn('button', {
        'button__primary': icon,
        'button__disabled': disabled,
        'button__primary--selected': !icon && selected,
        'button__favourite': icon === 'favourite',
        'button__item-count': icon === 'count',
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
