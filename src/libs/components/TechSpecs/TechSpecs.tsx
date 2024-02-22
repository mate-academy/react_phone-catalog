import cn from 'classnames';

import { parseSpecsValue } from '../../utils';
import './TechSpecs.scss';

type Props = {
  specs?: {
    [key: string]: string,
  },
  classNames?: string,
  hasBorder?: boolean,
};

export const TechSpecs: React.FC<Props> = ({
  specs = {},
  classNames,
  hasBorder = false,
}) => {
  const productSpecs = Object.entries(specs);

  return (
    <table
      className={cn(
        'phone-details',
        classNames,
        {
          'phone-details--border': hasBorder,
        },
      )}
    >
      <tbody className="phone-details__body">
        {
          productSpecs.map(([key, value]) => (
            <tr
              className="phone-details__row"
              key={key}
            >
              <td
                className="phone-details__name"
              >
                {key}
              </td>
              <td
                className="phone-details__description"
              >
                {parseSpecsValue(value)}
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};
