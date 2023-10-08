import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import './Button.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  content?: 'arrow' | 'cart' | 'favourite' | 'color' |
  'text' | 'quantity';
  sign?: 'plus' | 'minus';
  arrowDirection?: 'top' | 'left';
};

export const Button: React.FC<Props> = ({
  className = '',
  content,
  sign,
  arrowDirection,
  ...props
}) => {
  return (
    <button
      type="button"
      className={classNames(
        'Button',
        { [className]: className },
        { [`Button--${content}`]: content },
        { [`Button--quantity-${sign}`]: sign },
        { [`Button--arrow-${arrowDirection}`]: arrowDirection },
      )}
      {...props}
    />
  );
};
