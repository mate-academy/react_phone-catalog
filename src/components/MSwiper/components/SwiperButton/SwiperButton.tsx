import { Direction } from '../../../MySwiperProto/types/MSPtypes';
import { useMSContext } from '../../context/MSContext';
import { getIndex } from '../../helpers/swiperHelpers';
import styles from './SwiperButton.module.scss';

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
  const { offset, width, listLength, infinite, clamp } = useMSContext();
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
    if (
      infinite &&
      (offset.current < width.current * 2 ||
        offset.current > width.current * (listLength + 1))
    ) {
      return;
    }

    const mod = dir === Direction.RIGHT ? 1 : -1;

    const index = getIndex(offset.current, width.current);

    if (clamp && !checked()) {
      return;
    } else {
      setByIndex(index + mod, true);
    }
  };

  return (
    <button
      key={dir}
      className={`${styles['sw-button']} ${className}-${dir}`}
      onClick={() => handleClick()}
      disabled={!checked()}
    >
      <img
        src={`/src/assets/icons/arrow-${dir}.svg`}
        className={styles['sw-arrow']}
        alt=""
      />
    </button>
  );
};
