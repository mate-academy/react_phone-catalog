import cn from 'classnames';
import { useTranslation } from '@shared/context';
import { COLOR_HEXES, FALLBACK_COLOR_HEX } from '../../constants';
import styles from './ColorPicker.module.scss';

interface Props {
  colors: string[];
  selectedColor: string;
  isColorAvailable: (color: string) => boolean;
  onSelect: (color: string) => void;
}

export const ColorPicker: React.FC<Props> = ({
  colors,
  selectedColor,
  isColorAvailable,
  onSelect,
}) => {
  const { t } = useTranslation();

  return (
    <fieldset className={styles.picker}>
      <legend className={styles.label}>{t('details.availableColors')}</legend>

      <div className={styles.list}>
        {colors.map(color => (
          <label
            key={color}
            className={cn(styles.color, {
              [styles.colorSelected]: color === selectedColor,
            })}
          >
            <input
              type="radio"
              name="color"
              value={color}
              className="visually-hidden"
              checked={color === selectedColor}
              disabled={!isColorAvailable(color)}
              onChange={() => onSelect(color)}
            />

            <span
              className={styles.swatch}
              style={{
                backgroundColor: COLOR_HEXES[color] ?? FALLBACK_COLOR_HEX,
              }}
            />

            <span className="visually-hidden">{color}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};
