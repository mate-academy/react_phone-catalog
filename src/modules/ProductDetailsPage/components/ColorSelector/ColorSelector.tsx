import styles from './ColorSelector.module.scss';

interface ColorSelectorProps {
  colors: string[];
  selectedColor: string;
  onChange: (color: string) => void;
}

const COLOR_MAP: Record<string, string> = {
  black: '#000000',
  white: '#ffffff',
  gold: '#FFD700',
  silver: '#C0C0C0',
  gray: '#808080',
  grey: '#808080',
  red: '#FF0000',
  blue: '#0000FF',
  green: '#008000',
  yellow: '#FFFF00',
  purple: '#800080',
  pink: '#FFC0CB',
  orange: '#FFA500',
  brown: '#A52A2A',
  spacegray: '#5F7170',
  spacegray2: '#5F7170',
  graphite: '#4C4C4C',
  midnight: '#191970',
  starlight: '#F0F0F0',
  alpine: '#5F7170',
  sierra: '#8B7355',
  rose: '#FCDBC1',
  'dark green': '#004B23',
  'deep purple': '#5B2C6F',
};

function getColorHex(color: string): string {
  const normalized = color.toLowerCase().replace(/\s+/g, '');

  return COLOR_MAP[normalized] || '#CCCCCC';
}

export function ColorSelector({
  colors,
  selectedColor,
  onChange,
}: ColorSelectorProps): JSX.Element | null {
  if (colors.length <= 1) {
    return null;
  }

  return (
    <fieldset className={styles.selector}>
      <legend className={styles.legend}>Available colors</legend>
      <div
        className={styles.options}
        role="radiogroup"
        aria-label="Select color"
      >
        {colors.map(color => {
          const colorHex = getColorHex(color);
          const isSelected = color === selectedColor;
          const inputId = `color-${color}`;

          return (
            <label key={color} className={styles.option} title={color}>
              <input
                type="radio"
                id={inputId}
                name="color"
                value={color}
                checked={isSelected}
                onChange={() => onChange(color)}
                className={styles.input}
                aria-label={color}
              />
              <span
                className={styles.swatch}
                style={{ backgroundColor: colorHex } as React.CSSProperties}
                aria-hidden="true"
              >
                {isSelected && (
                  <svg
                    className={styles.checkmark}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
