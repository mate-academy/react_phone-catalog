import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import '../../styles/components/Button/Button.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  content: 'arrow' | 'math' | 'text';
  arrowDirection?: 'right' | 'left' | 'upper';
  sign?: 'plus' | 'minus';
  isActive?: boolean;
};

export const Button: React.FC<Props> = ({
  content,
  arrowDirection,
  sign,
  isActive,
  children,
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
        { 'is-active': isActive },
      )}
    >
      {children}
    </button>
  );
};
