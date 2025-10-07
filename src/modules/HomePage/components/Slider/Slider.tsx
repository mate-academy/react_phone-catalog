import styles from './Slider.module.scss';

interface SliderProps {
  image: string;
  alt: string;
}

export const Slider = ({ image, alt }: SliderProps) => {
  return (
    <div
      className={styles.img}
      style={{ backgroundImage: `url(${image})` }}
      aria-label={alt}
    ></div>
  );
};
