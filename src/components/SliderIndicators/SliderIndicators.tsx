import styles from './SliderIndicators.module.scss';

import cn from 'classnames';

type Props = {
  index: number;
  total: number;
};

export const SliderIndicators: React.FC<Props> = ({ index, total }) => {
  return (
    <div className={styles.SliderIndicators}>
      {new Array(...Array(total)).map((_value, currentIndex) => (
        <div
          key={currentIndex}
          className={cn(styles.SliderIndicator, {
            [styles.SliderIndicatorActive]: index === currentIndex,
          })}
        ></div>
      ))}
    </div>
  );
};
