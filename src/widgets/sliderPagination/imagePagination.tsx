import { useSliderData } from '@shared/lib';
import { usePagination } from './model/usePagination';
import styles from './styles/sliderPagination.module.scss';
import classNames from 'classnames';
import { LoaderSpinner } from '@ui/skeletons';
import { LoadStatus } from '@shared/api';

type ImagePaginationProps = {
  setByIndex: (idx: number) => void;
  images: string[];
};

type Props = {
  data: ImagePaginationProps | LoadStatus;
};

const FALLBACK_AMOUNT = 4;

export const ImagePagination = ({ data }: Props) => {
  const { startIndex } = useSliderData();

  const length =
    typeof data === 'string' ? FALLBACK_AMOUNT : data.images.length;

  const { getCurrent, dataIDs } = usePagination(length);

  return (
    <ul className={styles['image-pagination']} role="tablist">
      {dataIDs.map(el => (
        <button
          className={classNames(styles['image-button'], {
            [styles['image-button-is-active']]: getCurrent(el),
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
          {typeof data === 'string' ? (
            <LoaderSpinner />
          ) : (
            <img className={styles['product-image']} src={data.images[el]} />
          )}
        </button>
      ))}
    </ul>
  );
};
