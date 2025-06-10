import classNames from 'classnames';
import styles from './MSPPagination.module.scss';
import { useMSPContext } from '../../context/useMSPContext';

type Props = {
  className: string;
  swapper: (idx: number) => void;
};

export const MSPPagination: React.FC<Props> = ({ className, swapper }) => {
  const { listLength, activeIndexRef } = useMSPContext();
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
