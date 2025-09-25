import { useSliderData } from '../../../model';
import styles from '../../../styles/blockPagination.module.scss';
import classNames from 'classnames';

type Props = {
  amount: number;
  setByIndex: (idx: number) => void;
  startIndex: number;
  images?: string[];
};

export const AdaptivePagination = ({
  amount,
  setByIndex,
  startIndex,
  images,
}: Props) => {
  const { mechanics } = useSliderData();

  const dataIDs = [];

  for (let i = 0; i < amount; i++) {
    dataIDs.push(i);
  }

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
    <div className={styles['img-pagination']} role="tablist">
      {dataIDs.map(el => (
        <button
          className={classNames(styles['image-button'], {
            [styles['image-button-is-active']]: getCurrent(el),
          })}
          key={el}
          role="tab"
          onClick={() => {
            setByIndex(el + startIndex);
          }}
          aria-current={getCurrent(el)}
          aria-label={`Show slide #${el + 1}`}
        >
          {images && (
            <img className={styles['product-image']} src={images[el]} />
          )}
        </button>
      ))}
    </div>
  );
};
