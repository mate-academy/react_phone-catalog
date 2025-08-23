import { useSliderData } from '@widgets/sliderCss/model';
import styles from '../../../styles/blockPagination.module.scss';
import classNames from 'classnames';

type Props = {
  dataIDs: number[];
  setByIndex: (idx: number) => void;
  startIndex: number;
};

export const InfiniteBlockPagination = ({
  dataIDs,
  setByIndex,
  startIndex,
}: Props) => {
  const { mechanics } = useSliderData();
  const getCurrent = (id: number) => {
    const mod = id + 1;

    if (mechanics.index.current > dataIDs.length) {
      return mod === 1;
    }

    if (mechanics.index.current < 1) {
      return mod === dataIDs.length;
    }

    return mod === mechanics.index.current;
  };

  return (
    <div className={styles.pagination} role="tablist">
      {dataIDs.map(el => (
        <button
          className={styles['pagination-button']}
          key={el}
          onClick={() => setByIndex(el + startIndex)}
          aria-current={getCurrent(el)}
        >
          <div
            className={classNames(styles['pagination-img'], {
              [styles['pagination-img-is-active']]: getCurrent(el),
            })}
          />
        </button>
      ))}
    </div>
  );
};
