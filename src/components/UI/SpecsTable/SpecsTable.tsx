import React, { memo } from 'react';

import './SpecsTable.scss';
import { capitalize } from '../../../utils/stringHelper';

interface Props {
  name?: string,
  specs: { [key: string]: unknown },
  className?: string,
}

export const SpecsTable: React.FC<Props> = memo(({ name, specs, className }) => (
  <table className={`specs-table ${className || ''}`} >
    {name && (<thead>{name}</thead>)}

    <tbody>
      {Object.entries(specs).map(([spec, value]) => (
        <tr key={spec}>
          <td>{capitalize(spec)}</td>
          <td>{`${value}`}</td>
        </tr>
      ))}
    </tbody>
  </table>
));
