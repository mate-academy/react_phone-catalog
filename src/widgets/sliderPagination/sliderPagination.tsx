import classNames from 'classnames';
import { useSliderData } from '@shared/lib';
import { usePagination } from './model/usePagination';
import { sliderPaginationConfig } from './model/config';

// dependant on slider context, can not be used outside of it
interface Props {
  amount: number;
  setByIndex: (idx: number) => void;
  images?: string[];
}

export const SliderPagination = (props: Props) => {
  const { amount, setByIndex, images } = props;
  const { startIndex } = useSliderData();
  const { getCurrent, dataIDs } = usePagination(amount);
  const styles = sliderPaginationConfig[images ? 1 : 0];

  return (
    <div className={styles.container} role="tablist">
      {dataIDs.map(el => (
        <button
          className={classNames(styles.button, {
            [styles.active]: getCurrent(el) && images,
          })}
          key={el}
          role="tab"
          onClick={() => {
            setByIndex(el + startIndex);
          }}
          aria-current={getCurrent(el)}
          aria-label={`Show slide #${el + 1}`}
        >
          {images ? (
            <img className={styles.inner} src={images[el]} />
          ) : (
            <div
              className={classNames(styles.inner, {
                [styles.active]: getCurrent(el),
              })}
            />
          )}
        </button>
      ))}
    </div>
  );
};
