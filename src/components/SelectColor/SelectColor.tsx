import cn from 'classnames';

import { Colors } from '../../constants/colors';

import styles from './SelectColor.module.scss';

type Props = {
  onUpdateColor: (color: string) => void;
  updatedColor: string;
  colors: string[] | undefined;
};

export const SelectColor: React.FC<Props> = ({
  colors = [],
  updatedColor,
  onUpdateColor,
}) => {
  const handleSelectColor = (color: string) => {
    onUpdateColor(color);
  };

  return (
    <div className={styles.SelectColorWrapper}>
      {colors.map(currentColor => (
        <button
          onClick={() => handleSelectColor(currentColor)}
          key={currentColor}
          className={cn(styles.SelectColorItem, {
            [styles.SelectColorItemActive]: currentColor === updatedColor,
          })}
        >
          <div
            style={{
              backgroundColor: Colors[currentColor],
            }}
            className={styles.SelectColorElement}
          ></div>
        </button>
      ))}
    </div>
  );
};
