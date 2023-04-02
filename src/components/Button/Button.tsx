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
      className={`button ${type || ''}`}
      disabled={disabled}
      style={{ width: `${width}`, height: `${height}` }}
      onClick={handler}
    >
      {children}
    </button>
  );
};
