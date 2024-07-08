import styles from './ProductSlider.module.scss';
import ChevronIcon from './img/ChevronIcon.module.svg';

export const ProductSlider: React.FC = () => {
  return (
    <div className={styles.ProductSlider}>
      <div className={styles.topWrapper}>
        <div className={styles.buttons}>
          <button>
            <img src={ChevronIcon} alt="scroll" className={styles.iconPrev} />
          </button>

          <div className={styles.container}>
            <div className={styles.sliderWrapper}>
              <img src="./img/banner-accessories.png" />
            </div>
          </div>

          <button>
            <img src={ChevronIcon} alt="scroll" className={styles.iconNext} />
          </button>
        </div>
      </div>
    </div>
  );
};
