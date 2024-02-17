import cn from 'classnames';

import './TechSpecs.scss';

type Props = {
  specs?: {
    [key: string]: string,
  },
  classNames?: string,
  hasBorder?: boolean,
};
export const defaultSpecs = {
  Screen: '5.8” OLED',
  Capacity: '64 GB',
  RAM: '4 GB',
};

export const TechSpecs: React.FC<Props> = ({
  specs = defaultSpecs,
  classNames,
  hasBorder = false,
}) => {
  const arr = Object.entries(specs);

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
          arr.map(([key, value]) => (
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
                {value}
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};
