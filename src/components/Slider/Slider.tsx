import { DEFAULT_GAP, DEFAULT_SLIDES } from '../../constants/default-values';
import { SliderIndicators } from '../SliderIndicators';

import styles from './Slider.module.scss';

type Props = {
  total: number;
  pictureWidth: number;
  children: React.ReactNode;
  height: number;
  index: number;
  gap?: number;
  slidesPerView?: number;
  isShowIndicators?: boolean;
};

export const Slider: React.FC<Props> = ({
  total,
  pictureWidth,
  height,
  children,
  index,
  gap = DEFAULT_GAP,
  isShowIndicators = false,
  slidesPerView = DEFAULT_SLIDES,
}) => {
  const totalSliderWidth = pictureWidth * slidesPerView + gap;

  return (
    <>
      <div className={styles.Slider}>
        <div className={styles.SliderWrapper}>
          <div
            className={styles.SliderInner}
            style={{
              transform: `translateX(-${index * (pictureWidth + gap)}px)`,
              width: `${totalSliderWidth}px`,
              gap: `${gap}px`,
              transition: 'transform 1s',
              height: `${height}px`,
            }}
          >
            {children}
          </div>
        </div>
        {isShowIndicators && <SliderIndicators index={index} total={total} />}
      </div>
    </>
  );
};
