import { useNavigate } from 'react-router-dom';
import './ColorSelector.scss';

// CSS color overrides for Apple-specific color names
const COLOR_CSS: Record<string, string> = {
  spacegray: '#717378',
  midnightgreen: '#004953',
  rosegold: '#b76e79',
  midnight: '#1f2937',
  spaceblack: '#2c2c2e',
  graphite: '#4f4f4f',
  sierrablue: '#69abce',
  coral: '#ff7f50',
  gold: '#f9d174',
  silver: '#c0c0c0',
};

function colorToCss(color: string): string {
  return COLOR_CSS[color] ?? color;
}

interface Props {
  colors: string[];
  selected: string;
  category: string;
  namespaceId: string;
  capacity: string;
}

export function ColorSelector({ colors, selected, category, namespaceId, capacity }: Props) {
  const navigate = useNavigate();

  const handleSelect = (color: string) => {
    const variantId = `${namespaceId}-${capacity.toLowerCase()}-${color}`;
    navigate(`/${category}/${variantId}`);
  };

  return (
    <div className="color-selector">
      <p className="color-selector__label">Available colors</p>
      <div className="color-selector__swatches">
        {colors.map((color) => (
          <button
            key={color}
            className={`color-selector__swatch${color === selected ? ' color-selector__swatch--active' : ''}`}
            style={{ backgroundColor: colorToCss(color) }}
            onClick={() => handleSelect(color)}
            aria-label={color}
            aria-pressed={color === selected}
          />
        ))}
      </div>
    </div>
  );
}
