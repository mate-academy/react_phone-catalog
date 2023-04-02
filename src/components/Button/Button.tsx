import './button.scss';

type Props = {
  width: string;
  height: string;
  disabled?: boolean;
  handler?: () => void;
  type?: string;
  padding?: string;
};

export const Button: React.FC<Props> = ({
  children,
  width,
  height,
  handler,
  type,
  disabled,
  padding,
}) => {
  return (
    <button
      type="button"
      className={`button ${type || ''}`}
      disabled={disabled}
      style={{ width: `${width}`, height: `${height}`, padding: `${padding}` }}
      onClick={handler}
    >
      {children}
    </button>
  );
};
