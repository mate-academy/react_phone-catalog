import { Dot } from '../Dot/Dot';
import styles from './Dots.module.scss';

type Props = {
  slidesCount: number;
  goToSlide: (n: number) => void;
  slideIndex: number;
};

export const Dots: React.FC<Props> = ({
  slidesCount,
  goToSlide,
  slideIndex,
}) => {
  const renderDots = () => {
    const dots = [];

    for (let i = 0; i < slidesCount; i++) {
      dots.push(
        <Dot
          key={`dot-${i}`}
          number={i}
          goToSlide={goToSlide}
          slideIndex={slideIndex}
        />,
      );
    }

    return dots;
  };

  return <div className={styles.dots}>{renderDots()}</div>;
};
