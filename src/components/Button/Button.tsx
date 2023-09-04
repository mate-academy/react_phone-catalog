import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import '../../styles/components/Button/Button.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  content: 'arrow' | 'math';
  arrowDirection?: 'right' | 'left' | 'upper';
  sign?: 'plus' | 'minus';
};

export const Button: React.FC<Props> = ({
  content,
  arrowDirection,
  sign,
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
      )}
    />
  );
};
