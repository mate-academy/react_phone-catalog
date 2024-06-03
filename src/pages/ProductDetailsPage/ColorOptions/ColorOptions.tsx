import { Link } from 'react-router-dom';
import cn from 'classnames';
import { getNewColorUrl } from '../../../helpers/getNewColorUrl';
import { theme } from '../../../helpers/colors';
import { Color } from '../../../types/Color';
import { DetailedProduct } from '../../../types/DetailedProduct';
import './ColorOptions.scss';

type Props = { colorsAvailable: string[]; displayedProduct: DetailedProduct };

export const ColorOptions: React.FC<Props> = ({
  colorsAvailable,
  displayedProduct,
}) => {
  const productColors = theme.colors;

  const currentColor = displayedProduct.color;

  const urlColors = [...colorsAvailable].map((color: string) =>
    color.replaceAll(' ', '-'),
  );

  return (
    <ul className="colors-list">
      {urlColors.map((color: string) => (
        <li
          key={color}
          className={cn('colors-list__item', {
            'colors-list__item--active': color === currentColor,
          })}
        >
          <Link
            to={getNewColorUrl(displayedProduct.id, color)}
            className="colors-list__color"
            style={{
              backgroundColor:
                color in productColors ? productColors[color as Color] : 'gray',
            }}
          ></Link>
        </li>
      ))}
    </ul>
  );
};
