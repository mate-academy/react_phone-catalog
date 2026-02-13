import { useSliderData } from '@shared/lib';
import styles from '../styles/productList.module.scss';
type Props = {
  data: string[];
  name: string;
};

export const ProductSlideList = ({ data, name }: Props) => {
  const { DOM } = useSliderData();

  return (
    <>
      <figure className={styles.figure} aria-hidden="true">
        <img src={data[data.length - 1]} alt="" className={styles.image} />
      </figure>
      {data.map((item, index) => (
        <figure
          className={styles.figure}
          ref={index === 0 ? DOM.item : null}
          key={index}
        >
          <img
            src={item}
            alt={`${name} picture ${index + 1} of ${data.length}`}
            className={styles.image}
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        </figure>
      ))}
      <figure className={styles.figure} aria-hidden="true">
        <img src={data[0]} alt="" className={styles.image} loading="lazy" />
      </figure>
    </>
  );
};
