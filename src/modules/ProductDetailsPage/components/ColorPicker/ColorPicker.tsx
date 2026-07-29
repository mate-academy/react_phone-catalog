import styles from './ColorPicker.module.scss';

const colorToHex: Record<string, string> = {
  black: '#000000',
  white: '#ffffff',
  gold: '#e6d2ae',
  silver: '#e8e8e8',
  spacegray: '#535150',
  midnightgreen: '#3f4a41',
  red: '#b12b28',
  yellow: '#f5e13e',
  green: '#a3c6a8',
  purple: '#d6cee6',
  pink: '#f5d6d6',
  coral: '#ff7f6b',
  sierrablue: '#a7c1d9',
  graphite: '#4c4948',
  gray: '#8e8e8e',
  midnight: '#1c1c1e',
  starlight: '#f5f0e6',
  blue: '#0071e3',
  'space gray': '#535150',
  'rose gold': '#e6cbc0',
};

const getColorHex = (color: string) =>
  colorToHex[color.toLowerCase().replace(/\s/g, '')] ?? color;

type Props = {
  colors: string[];
  selected: string;
  onChange: (color: string) => void;
};

export const ColorPicker = ({ colors, selected, onChange }: Props) => (
  <fieldset className={styles.picker}>
    <legend className={styles.legend}>Available colors</legend>

    <div className={styles.options}>
      {colors.map(color => (
        <label key={color} className={styles.option}>
          <input
            type="radio"
            name="color"
            value={color}
            checked={color === selected}
            onChange={() => onChange(color)}
            className={styles.input}
            aria-label={color}
          />
          <span
            className={styles.swatch}
            style={{ backgroundColor: getColorHex(color) }}
          />
        </label>
      ))}
    </div>
  </fieldset>
);
