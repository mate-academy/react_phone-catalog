import styles from './Slider.module.scss';
import Chevron from '@/assets/icons/chevron.svg?react';
import Button from '@/atoms/Button';

const Slider = () => {
  return (
    <div className={styles.slider}>
      <Button classNames={styles.button__left}>
        <Chevron />
      </Button>

      <div className={styles.slider__insider} />

      <Button classNames={styles.button__right}>
        <Chevron />
      </Button>

      <div className={styles.pagination}>
        <div className={styles.pagination__block} />
        <div className={styles.pagination__block} />
        <div className={styles.pagination__block} />
      </div>
    </div>
  )
}

export default Slider;
