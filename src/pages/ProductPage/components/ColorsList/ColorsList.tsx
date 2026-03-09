import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/Button';
import { ProductDetailed } from '../../../../types/product';

type Props = {
  className?: string;
  product: ProductDetailed;
};

const possibleColors = [
  { name: 'black', hex: '#000000' },
  { name: 'gold', hex: '#FCDBC1' },
  { name: 'green', hex: '#b7e4d1' },
  { name: 'yellow', hex: '#ffe88a' },
  { name: 'white', hex: '#fdf8f2' },
  { name: 'purple', hex: '#cfcbda' },
  { name: 'red', hex: '#cd2840' },
  { name: 'spacegray', hex: '#575554' },
  { name: 'space gray', hex: '#575554' },
  { name: 'space-gray', hex: '#575554' },
  { name: 'midnight', hex: '#00192a' },
  { name: 'midnightgreen', hex: '#5c665f' },
  { name: 'silver', hex: '#e3e3d9' },
  { name: 'rosegold', hex: '#eec5bf' },
  { name: 'rose gold', hex: '#eec5bf' },
  { name: 'coral', hex: '#fc6352' },
  { name: 'graphite', hex: '#7e7c79' },
  { name: 'sierrablue', hex: '#90a3bc' },
  { name: 'spaceblack', hex: '#242321' },
  { name: 'blue', hex: '#246180' },
  { name: 'pink', hex: '#f8dbd5' },
  { name: 'sky blue', hex: '#acbdcd' },
  { name: 'starlight', hex: '#cac0b5' },
];

export const ColorsList: React.FC<Props> = ({ className, product }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const basePath = location.pathname.split('/')[1] || '';

  const colorsWithHex = product.colorsAvailable
    .map(colorName => {
      const hex = possibleColors.find(c => c.name === colorName)?.hex;

      if (!hex) {
        return null;
      }

      return { name: colorName, hex };
    })
    .filter((color): color is { name: string; hex: string } => Boolean(color));

  const reordered = [
    ...colorsWithHex.filter(color => color.name === product.color),
    ...colorsWithHex.filter(color => color.name !== product.color),
  ];

  return (
    <div className={className}>
      {reordered.map(el => {
        const selected = el.name === product.color;
        const route = `${product.namespaceId}-${product.capacity.toLowerCase()}-${el.name.replace(/\s+/g, '-')}`;

        const handleChoose = () => {
          navigate(`/${basePath}/${route}`);
        };

        return (
          <Button
            key={el.name}
            variant="round"
            colorHex={el.hex}
            selected={selected}
            onClick={handleChoose}
          />
        );
      })}
    </div>
  );
};
