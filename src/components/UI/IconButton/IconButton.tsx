import './IconButton.scss';

type IconButtonProps = {
  onClick: () => void;
  alt: string;
  height?: number;
  svg?: string;
  isDisabled?: boolean;
  children?: React.ReactNode;
};

export const IconButton = ({
  onClick,
  svg,
  alt,
  isDisabled = false,
  height = 32,
  children,
}: React.PropsWithChildren<IconButtonProps>) => {
  return (
    <button
      style={{ height }}
      className="button"
      type="button"
      onClick={onClick}
      disabled={isDisabled}
    >
      {children || <img className="button__icon" src={svg} alt={alt} />}
    </button>
  );
};
