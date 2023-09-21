import '../../styles/components/Button/Button.scss';

import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  content: 'arrow' | 'math' | 'text' | 'color' | 'fav';
  arrowDirection?: 'right' | 'left' | 'upper';
  sign?: 'plus' | 'minus';
  isSelected?: boolean,
  isActive?: boolean;
};

export const Button: React.FC<Props> = ({
  content,
  arrowDirection,
  sign,
  isActive,
  children,
  isSelected,
  ...props
}) => {
  return (
    <button
      type="button"
      {...props}
      className={classNames(
        'button',
        `button--${content}`,
        { [`button--arrow-${arrowDirection}`]: arrowDirection },
        { [`button--math-${sign}`]: sign },
        { 'is-selected': isSelected },
        { 'is-active': isActive },
      )}
    >
      {children}
    </button>
  );
};
