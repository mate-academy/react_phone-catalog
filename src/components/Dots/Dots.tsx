import styles from './Dots.module.scss';

type Props = {
  sliderPictures: string[];
  dotsClick(index: number): void;
  currentIndex: number;
  resetInterval: () => void;
};

export const Dots: React.FC<Props> = ({
  sliderPictures,
  dotsClick,
  currentIndex,
  resetInterval,
}) => {
  return (
    <div className={styles.dots}>
      {sliderPictures.map((_, index) => {
        return (
          <button
            onClick={() => {
              dotsClick(index);
              resetInterval();
            }}
            key={index}
            className={`${styles.dots__dot} ${index === currentIndex ? styles.dots__dotActive : ''}`}
          />
        );
      })}
    </div>
  );
};

export default Dots;
