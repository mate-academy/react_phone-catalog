import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import {
  background,
  phoneByColor,
} from '../utils/detailsUtils';
import { Color } from '../types/Color';
import { Phone } from '../types/Phone';

type Props = {
  colors?: [keyof typeof Color],
  id?: string,
  phones: Phone[],
};

export const ColorsDetails: React.FC<Props> = ({
  colors,
  id,
  phones,
}) => {
  console.log(id, colors, phones);

  return (
    <div className="color-details">
      <div className="details-select-container__paragraph">
        Available colors
      </div>
      <ul className="color-details__collection">
        {colors?.map(color => (
          <li key={color}>
            <NavLink
              style={background(color)}
              to={`/Phones/${phoneByColor(color, id, phones)}`}
              className={({ isActive }) => classNames(
                'color',
                { 'active-color': isActive },
              )}
            />
          </li>
        ))}
      </ul>
      <div className="details-select-container__underline" />
    </div>
  );
};
