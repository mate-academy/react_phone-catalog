import classNames from 'classnames';
import './button.scss';

type Props = {
  width: string;
  height: string;
  disabled?: boolean;
  handler?: () => void;
  type?: string;
};

export const Button: React.FC<Props> = ({
  children,
  width,
  height,
  handler,
  type,
  disabled,
}) => {
  return (
    <button
      type="button"
      className={classNames(
        'button',
        { [type as string]: type !== '' },
      )}
      disabled={disabled}
      style={{ width: `${width}`, height: `${height}` }}
      onClick={handler}
    >
      {children}
    </button>
  );
};
