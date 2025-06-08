import { useSwiperCore } from '../../model/hooks/useSwiperCore';
import { ArrDir } from '../../model/types';
import styles from './SwiperButton.module.scss';

type Props = {
  dir: ArrDir;
  className: string;
};

export const SwiperButton: React.FC<Props> = ({ dir, className }) => {
  const { snapHandler } = useSwiperCore();
  const onDown = () => {
    if (dir === ArrDir.Next) {
      snapHandler(true, ArrDir.Next);
    } else {
      snapHandler(true);
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
