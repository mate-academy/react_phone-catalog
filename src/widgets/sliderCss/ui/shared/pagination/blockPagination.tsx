import { useSliderData } from '@widgets/sliderCss/model';
import styles from '../../../styles/blockPagination.module.scss';
import classNames from 'classnames';

type Props = {
  dataIDs: number[];
  handler: (pos: number) => void;
};

export const InfiniteBlockPagination = ({ dataIDs, handler }: Props) => {
  const { activeIndex } = useSliderData();
  const getCurrent = (id: number) => {
    const mod = id + 1;

    if (activeIndex > dataIDs.length) {
      return mod === 1;
    }

    if (activeIndex < 1) {
      return mod === dataIDs.length;
    }

    return mod === activeIndex;
  };

  return (
    <div className={styles.pagination} role="tablist">
      {dataIDs.map(el => (
        <button
          className={styles['pagination-button']}
          key={el}
          onClick={() => handler(el)}
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
