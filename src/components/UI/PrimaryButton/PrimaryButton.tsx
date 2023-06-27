import classNames from 'classnames';
import './PrimaryButton.scss';

type PrimaryButtonProps = {
  width: number;
  height: number;
  onClick: () => void;
  children?: React.ReactNode;
  isActive?: boolean;
};

export const PrimaryButton = ({
  width,
  height,
  children,
  onClick,
  isActive,
}: PrimaryButtonProps) => (
  <button
    onClick={onClick}
    style={{ width, height }}
    className={classNames('cart-button', { 'cart-button--selected': isActive })}
    type="button"
    disabled={isActive}
  >
    {isActive ? 'Added to cart' : children}
  </button>
);
