/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { AppRoutes } from 'config';
import { colorPallette } from './colorPallette';
import './Colors.scss';

type Props = {
  colors: string[],
  nameSpaceId: string,
  capacity: string,
  currColor: string,
};

export const Colors: React.FC<Props> = ({
  colors,
  nameSpaceId,
  capacity,
  currColor,
}) => {
  return (
    <div className="colors">
      <h2 className="colors__heading">Available colors</h2>
      <div className="colors__list">
        {colors.map(color => (
          <div
            key={color}
            className="colors__item"
          >
            <div className={classNames('colors__border', {
              'colors__border--selected': color === currColor,
            })}
            >
              <Link
                to={`${AppRoutes.Phones}/${nameSpaceId}-${capacity.toLowerCase()}-${color}`}
                className="colors__circle"
                style={{ backgroundColor: `${colorPallette[color]}` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
