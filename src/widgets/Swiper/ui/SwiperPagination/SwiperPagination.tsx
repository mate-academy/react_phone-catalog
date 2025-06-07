import classNames from 'classnames';
import styles from './SwiperPagination.module.scss';
import { useSwiperContext } from '../../model/SwiperContext';

type Props = {
  className: string;
  swapper: (idx: number) => void;
};

export const SwiperPagination: React.FC<Props> = ({ className, swapper }) => {
  const { listLength, activeIndexRef } = useSwiperContext();
  const array = [];

  for (let i = 0; i < listLength; i++) {
    array.push(i);
  }

  return (
    <div className={`${styles['line-pagination']} ${className}`}>
      {array.map(li => (
        <div
          key={li}
          className={`${styles['line-container']}`}
          onClick={() => swapper(li)}
        >
          <div
            className={classNames(styles['line-element'], {
              [styles['line-element__active']]: li === activeIndexRef.current,
            })}
          />
        </div>
      ))}
    </div>
  );
};
