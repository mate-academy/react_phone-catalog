import { Button } from '@ui/button';
import { Direction } from '../../../../shared/types/direction';
import { useMSContext } from '../../context/MSContext';
import { getIndex } from '../../helpers/swiperHelpers';
import { useSafeCheck } from '../../hooks/useSafeCheck';
import styles from './SwiperButton.module.scss';
import { ButtonNames, ButtonsProps, Path } from '@shared/types/ButtonProps';

type Props = {
  dir: Direction;
  className: string;
  setByIndex: (index: number, animation?: boolean) => void;
};

export const SwiperButton: React.FC<Props> = ({
  dir,
  className,
  setByIndex,
}) => {
  const { offset, width, listLength, infinite, clamp, gap } = useMSContext();
  const { checker } = useSafeCheck();
  const length = listLength;

  const checked = () => {
    if (infinite) {
      return true;
    }

    if (
      offset.current === (length - 1) * width.current &&
      dir === Direction.RIGHT
    ) {
      return false;
    }

    if (offset.current === 0 && dir === Direction.LEFT) {
      return false;
    }

    return true;
  };

  const handleClick = () => {
    if (!checker()) {
      return;
    }

    const mod = dir === Direction.RIGHT ? 1 : -1;

    const index = getIndex(offset.current, width.current, gap);

    if (clamp && !checked()) {
      return;
    } else {
      setByIndex(index + mod, true);
    }
  };

  const button: ButtonsProps =
    dir === Direction.RIGHT
      ? { name: ButtonNames.Next, path: Path.Next }
      : { name: ButtonNames.Prev, path: Path.Prev };

  return (
    <Button
      key={button.name}
      data={button}
      className={`${styles['sw-button']} ${className}-${dir}`}
      fn={() => handleClick()}
      disabled={!checked()}
    />
  );
};
