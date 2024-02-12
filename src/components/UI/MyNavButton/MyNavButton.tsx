import { useMemo } from 'react';
import { Navigation } from '../../../types/navigation';
import './MyNavButton.scss';

type Props = {
  direction: Navigation;
  disabled: boolean;
  onClick: (direction: Navigation) => void;
};

function rotateArrow(direction: Navigation) {
  switch (direction) {
    case Navigation.right: return '90deg';
    case Navigation.down: return '180deg';
    case Navigation.left: return '270deg';
    default: return '0';
  }
}

export const MyNavButton: React.FC<Props> = ({
  direction,
  disabled,
  onClick,
}) => {
  const rotate = useMemo(() => rotateArrow(direction), [direction]);

  return (
    <button
      type="button"
      aria-label={`move ${direction}`}
      className="my-nav-button"
      disabled={disabled}
      onClick={() => onClick(direction)}
    >
      <img
        src="img/icons/chevron-up.svg"
        alt={`move ${direction}`}
        style={{ transform: `rotate(${rotate})` }}
      />
    </button>
  );
};
