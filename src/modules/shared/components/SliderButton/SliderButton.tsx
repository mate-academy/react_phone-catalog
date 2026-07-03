//#region imports
import { IconButton } from '../IconButton';
import { ArrowIcon } from './components/ArrowIcon';
import { Direction } from '../../types/Direction';
//#endregion

type Props = {
  direction: Direction;
  size?: 'circle' | 'oval';
  onClick: () => void;
  disabled?: boolean;
  ariaLabel?: string;
};

export const SliderButton: React.FC<Props> = ({
  direction,
  size = 'circle',
  onClick,
  disabled = false,
  ariaLabel,
}) => {
  return (
    <IconButton
      size={size}
      disabled={disabled}
      onClick={onClick}
      ariaLabel={ariaLabel}
    >
      <ArrowIcon direction={direction} isDisabled={disabled} />
    </IconButton>
  );
};
