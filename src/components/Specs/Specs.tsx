import './specs.scss';

import { SpecsMode } from '../../types/SpecsMode';

type Props = {
  specs: string[][];
  mode: SpecsMode;
};

export const Specs: React.FC<Props> = ({ specs, mode }) => (
  <ul className="specs">
    {specs.map(([key, value]) => (
      <li className="specs__item" key={key}>
        <div className={`specs__name-${mode}`}>{key}</div>
        <div className={`specs__value-${mode}`}>{value}</div>
      </li>
    ))}
  </ul>
);
