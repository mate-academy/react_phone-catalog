import classNames from 'classnames';
import styles from './SwiperPagination.module.scss';
import { useMSContext } from '../../context/MSContext';
import { getIndex } from '../../helpers/swiperHelpers';

type Props = {
  className: string;
  setByIndex: (index: number, animation?: boolean) => void;
};

export const SwiperPagination: React.FC<Props> = ({
  className,
  setByIndex,
}) => {
  const { listLength, offsetRef, widthRef } = useMSContext();
  const arr = [];
  const index = getIndex(offsetRef.current, widthRef.current);

  for (let i = 0; i < listLength; i++) {
    arr.push(i);
  }

  return (
    <div className={`${styles['line-pagination']} ${className}`}>
      {arr.map(li => (
        <div
          key={li}
          className={`${styles['line-container']}`}
          onClick={() => setByIndex(li, true)}
        >
          <div
            className={classNames(styles['line-element'], {
              [styles['line-element__active']]: li === index,
            })}
          />
        </div>
      ))}
    </div>
  );
};
