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
  const { listLength, offsetRef, widthRef, infinite } = useMSContext();
  const arr = [];
  const length = listLength;
  const index = getIndex(offsetRef.current, widthRef.current);

  for (let i = 0; i < length; i++) {
    arr.push(i);
  }

  return (
    <div className={`${styles['line-pagination']} ${className}`}>
      {arr.map(li => (
        <div
          key={li}
          className={`${styles['line-container']}`}
          onClick={() => setByIndex(infinite ? li + 2 : li, true)}
        >
          <div
            className={classNames(styles['line-element'], {
              [styles['line-element__active']]: infinite
                ? li === index - 2
                : li === index,
            })}
          />
        </div>
      ))}
    </div>
  );
};
