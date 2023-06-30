import { Specifications } from '../../types/specifications';
import './SpecTable.scss';

type SpecTableProps = {
  specifications: Specifications;
  style?: { fontSize: number; fontWeight: number };
  specCount?: number;
};

export const SpecTable = ({
  specifications,
  style = { fontSize: 12, fontWeight: 600 },
  specCount,
}: SpecTableProps) => (
  <table className="specification-table">
    <tbody style={style} className="specification-table__body">
      {Object.entries(specifications).map(([key, value], i) => {
        if (specCount && specCount <= i) {
          return null;
        }

        return (
          <tr key={key} className="specification-table__row">
            <td className="specification-table__details">{key}</td>
            <td>{Array.isArray(value) ? value.join(', ') : value}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
