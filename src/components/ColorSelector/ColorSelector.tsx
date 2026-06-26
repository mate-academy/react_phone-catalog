import classNames from 'classnames';
import colorSelectorStyles from './ColorSelector.module.scss';

type Props = {
  colors: string[];
  selectedColor: string;
  handleColorChange: (color: string) => void;
};

const colorMap: Record<string, string> = {
  gold: '#FCDBC1',
  silver: '#F0F0F0',
  spacegray: '#4C4C4C',
  midnightgreen: '#5F7170',
  black: '#313237',
  white: '#F0F0F0',
  red: '#EB5757',
  green: '#27AE60',
  yellow: '#FFE681',
  purple: '#D1CDD7',
  midnight: '#1D1D1F',
};

const normalizeColor = (color: string) => {
  return color.toLowerCase().replace(/[\s-]/g, '');
};

const getColorValue = (color: string) => {
  const normalizedColor = normalizeColor(color);

  return colorMap[normalizedColor] || color;
};

export const ColorSelector = ({
  colors,
  selectedColor,
  handleColorChange,
}: Props) => {
  return (
    <div className={colorSelectorStyles.ColorSelectorContainer}>
      <span className={'font-small'}>Available colors</span>
      <div className={colorSelectorStyles.ColorSelectorContainerInner}>
        {colors.map(colorAvailable => (
          <button
            onClick={() => handleColorChange(colorAvailable)}
            key={colorAvailable}
          >
            <div
              className={classNames(colorSelectorStyles.ColorSelectorBorder, {
                [colorSelectorStyles.ColorSelectorBorderActive]:
                  normalizeColor(colorAvailable) === selectedColor,
              })}
            >
              <span
                style={{
                  backgroundColor: getColorValue(colorAvailable),
                }}
                className={colorSelectorStyles.ColorSelector}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
