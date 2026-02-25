import { CapacityRadioButtom } from '../../../../shared/UI/Buttons/CapacityRadioButtom/CapacityRadioButtom';
import { ColorRadioButton } from '../../../../shared/UI/Buttons/ColorRadioButton/ColorRadioButton';

import styles from './RadioGroup.module.scss';

interface Props {
  type: 'color' | 'text';
  label?: string;
  options: string[];
  onChangeColor?: (value: string) => void;
  onChangeCapacity?: (value: string) => void;
  active: string;
}

export const RadioGroup: React.FC<Props> = ({
  label,
  options,
  onChangeColor = () => {},
  onChangeCapacity = () => {},
  active,
  type,
}) => {
  return (
    <div role="radiogroup" className={styles.radio__group}>
      <label htmlFor={type} className={styles.label}>
        {label}
      </label>

      <div className={styles.container}>
        {type === 'color'
          ? options.map(option => (
              <ColorRadioButton
                key={option}
                name={type}
                color={option}
                checked={option === active}
                onChange={() => onChangeColor(option)}
              />
            ))
          : options.map(options => (
              <CapacityRadioButtom
                key={options}
                name={type}
                capacity={options}
                checked={options === active}
                onChange={() => onChangeCapacity(options)}
              />
            ))}
      </div>
    </div>
  );
};
