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
        'product-details',
        classNames,
        {
          'product-details--border': hasBorder,
        },
      )}
    >
      <tbody className="product-details__body">
        {
          productSpecs.map(([key, value]) => (
            <tr
              className="product-details__row"
              key={key}
            >
              <td
                className="product-details__name"
              >
                {key}
              </td>
              <td
                className="product-details__description"
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
