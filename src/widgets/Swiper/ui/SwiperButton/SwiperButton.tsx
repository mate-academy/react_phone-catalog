import { useSwiperContext } from '../../model/SwiperContext';
import { ArrDir } from '../../model/types';
import styles from './SwiperButton.module.scss';

type Props = {
  dir: ArrDir;
  className: string;
};

export const SwiperButton: React.FC<Props> = ({ dir, className }) => {
  const { offset, setOffset, width } = useSwiperContext();

  const onDown = () => {
    if (dir === ArrDir.Previous) {
      setOffset(Math.floor(offset / width) * width - width);
    } else {
      setOffset(Math.ceil(offset / width) * width + width);
    }
  };

  return (
    <button
      className={`${styles['sw-button']} ${className}-${dir}`}
      onClick={onDown}
    >
      <img
        src={`/src/shared/ui/icons/arrow-${dir}.svg`}
        className={styles['sw-arrow']}
        alt=""
      />
    </button>
  );
};
