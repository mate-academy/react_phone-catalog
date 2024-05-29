import { Link } from 'react-router-dom';
import { getNewColorUrl } from '../../../helpers/getNewColorUrl';
import { theme } from '../../../helpers/colors';
import { Color } from '../../../types/Color';
import { DetailedProduct } from '../../../types/DetailedProduct';
import './ColorOptions.scss';
import cn from 'classnames';

type Props = { colorsAvailable: string[]; displayedProduct: DetailedProduct };

export const ColorOptions: React.FC<Props> = ({
  colorsAvailable,
  displayedProduct,
}) => {
  const productColors = theme.colors;

  const currentColor = displayedProduct.color;

  return (
    <ul className="colors-list">
      {colorsAvailable.map((color: string) => (
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
