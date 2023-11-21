import { PhoneDetails } from '../../types/phoneDetails';

import './style.scss';

type Props = Partial<PhoneDetails>;

export const PhoneSpecs: React.FC <Props> = ({
  screen,
  resolution,
  processor,
  ram,
  capacity,
  camera,
  zoom,
  cell = [],
}) => {
  const cellString = cell.join(', ');

  return (
    <ul className="specification__list">
      <li className="specification__listItem">
        <span className="specification__name">Screen</span>
        <span className="specification__value">{screen}</span>
      </li>
      <li className="specification__listItem">
        <span className="specification__name">Resolution</span>
        <span className="specification__value">{resolution}</span>
      </li>
      <li className="specification__listItem">
        <span className="specification__name">Processor</span>
        <span className="specification__value">{processor}</span>
      </li>
      <li className="specification__listItem">
        <span className="specification__name">RAM</span>
        <span className="specification__value">{ram}</span>
      </li>
      <li className="specification__listItem">
        <span className="specification__name">Built in memory</span>
        <span className="specification__value">{capacity}</span>
      </li>
      <li className="specification__listItem">
        <span className="specification__name">Camera</span>
        <span className="specification__value">{camera}</span>
      </li>
      <li className="specification__listItem">
        <span className="specification__name">Zoom</span>
        <span className="specification__value">{zoom}</span>
      </li>
      <li className="specification__listItem">
        <span className="specification__name">Cell</span>
        <span className="specification__value">{cellString}</span>
      </li>
    </ul>
  );
};
