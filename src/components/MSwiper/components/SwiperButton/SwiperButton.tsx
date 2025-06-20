import { Direction } from '../../../MySwiperProto/types/MSPtypes';
import { useMSContext } from '../../context/MSContext';
import { getIndex } from '../../helpers/swiperHelpers';
import styles from './SwiperButton.module.scss';

type Props = {
  dir: Direction;
  className: string;
  setByIndex: (index: number, animation?: boolean) => void;
  clmp: boolean;
};

export const SwiperButton: React.FC<Props> = ({
  dir,
  className,
  setByIndex,
  clmp,
}) => {
  const { offsetRef, widthRef, listLength } = useMSContext();
  const length = listLength;

  const checked = () => {
    if (
      offsetRef.current === (length - 1) * widthRef.current &&
      dir === Direction.RIGHT
    ) {
      return false;
    }

    if (offsetRef.current === 0 && dir === Direction.LEFT) {
      return false;
    }

    return true;
  };

  const handleClick = () => {
    const mod = dir === Direction.RIGHT ? 1 : -1;
    const index = getIndex(offsetRef.current, widthRef.current);

    if (clmp && !checked()) {
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
