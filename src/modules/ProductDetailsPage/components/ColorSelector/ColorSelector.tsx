import styles from './ColorSelector.module.scss';

type Props = {
  colors: string[];
  selected: string;
  onSelect: (color: string) => void;
};

const SWATCH: Record<string, string> = {
  black: '#1c1c1e',
  white: '#f5f5f5',
  silver: '#d6d8db',
  gold: '#e8d3a5',
  blue: '#3a4cf0',
  purple: '#8b6fd6',
  midnight: '#1d2233',
  midnightgreen: '#39493f',
  red: '#c23b3b',
  green: '#3f7d52',
  graphite: '#3d3f44',
  starlight: '#e8e2d6',
  pink: '#e3a1b4',
  coral: '#ff7f66',
  yellow: '#f0d54c',
  'rose gold': '#e9c2bd',
  rosegold: '#e9c2bd',
  sierrablue: '#a2bfd6',
  'sky blue': '#8fc0e0',
  'space gray': '#4b4d52',
  spacegray: '#4b4d52',
  spaceblack: '#2b2b2d',
};

export const ColorSelector: React.FC<Props> = ({
  colors,
  selected,
  onSelect,
}) => {
  if (colors.length === 0 || colors[0] === '-') {
    return null;
  }

  return (
    <fieldset className={styles.selector}>
      <legend className={styles.selector__legend}>Available colors</legend>

      <div className={styles.selector__options}>
        {colors.map(color => (
          <label key={color} className={styles.selector__option}>
            <input
              type="radio"
              name="color"
              value={color}
              checked={color === selected}
              onChange={() => onSelect(color)}
              className="visually-hidden"
            />
            <span className="visually-hidden">{color}</span>
            <span
              className={`${styles.selector__swatch} ${
                color === selected ? styles['selector__swatch--active'] : ''
              }`}
              style={{ background: SWATCH[color] ?? '#ccc' }}
              title={color}
            />
          </label>
        ))}
      </div>
    </fieldset>
  );
};
