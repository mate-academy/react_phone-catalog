import './IconButton.scss';

type IconButtonProps = {
  onClick: () => void;
  svg: string;
  alt: string;
  height?: number;
  isDisabled?: boolean;
};

export const IconButton = ({
  onClick,
  svg,
  alt,
  isDisabled = false,
  height = 32,
}: IconButtonProps) => {
  return (
    <button
      style={{ height }}
      className="button"
      type="button"
      onClick={onClick}
      disabled={isDisabled}
    >
      <img className="button__icon" src={svg} alt={alt} />
    </button>
  );
};
