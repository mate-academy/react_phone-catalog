import classNames from 'classnames';
import styles from './MSPPagination.module.scss';
import { useMSPContext } from '../../context/useMSPContext';

type Props = {
  className: string;
  swapper: (idx: number) => void;
  getIndex: () => number;
};

export const MSPPagination: React.FC<Props> = ({
  className,
  swapper,
  getIndex,
}) => {
  const { listLength } = useMSPContext();
  const array = [];

  for (let i = 0; i < listLength; i++) {
    array.push(i);
  }

  const helper = () => {
    if (getIndex() <= 0) {
      return 0;
    }

    if (getIndex() >= listLength) {
      return listLength;
    }

    return getIndex();
  };

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
              [styles['line-element__active']]: li === helper(),
            })}
          />
        </div>
      ))}
    </div>
  );
};
