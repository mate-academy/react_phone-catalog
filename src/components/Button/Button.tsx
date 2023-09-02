import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import '../../styles/components/Button/Button.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  content: 'arrow';
  arrowDirection?: 'right' | 'left' | 'upper';
};

export const Button: React.FC<Props> = ({
  content,
  arrowDirection,
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
      )}
    />
  );
};
