import { useSliderData } from '@shared/lib';
import { usePagination } from './model/usePagination';
import styles from './styles/sliderPagination.module.scss';
import classNames from 'classnames';
import { LoadStatus } from '@features/index';

type BlockPaginationProps = {
  amount: number;
  setByIndex: (idx: number) => void;
};

type Props = {
  data: BlockPaginationProps | LoadStatus;
};

const FALLBACK_AMOUNT = 4;

export const SliderPagination = ({ data }: Props) => {
  const { startIndex } = useSliderData();

  const length = typeof data === 'string' ? FALLBACK_AMOUNT : data.amount;

  const { getCurrent, dataIDs } = usePagination(length);

  return (
    <ul className={styles['block-pagination']} role="tablist">
      {dataIDs.map(el => (
        <button
          className={classNames(styles['pagination-button'], {
            [styles['pagination-button-is-active']]: getCurrent(el),
          })}
          key={el}
          role="tab"
          onClick={
            typeof data === 'string'
              ? undefined
              : () => data.setByIndex(el + startIndex)
          }
          aria-current={getCurrent(el)}
          aria-label={`Show slide #${el + 1}`}
        >
          <div className={styles['pagination-block']} />
        </button>
      ))}
    </ul>
  );
};
