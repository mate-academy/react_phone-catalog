import './PrimaryButton.scss';

type PrimaryButtonProps = {
  width: number;
  height: number;
  children?: React.ReactNode;
  onClick: () => void;
};

export const PrimaryButton = ({
  width,
  height,
  children,
  onClick,
}: PrimaryButtonProps) => (
  <button
    onClick={onClick}
    style={{ width, height }}
    className="cart-button"
    type="button"
  >
    {children}
  </button>
);
