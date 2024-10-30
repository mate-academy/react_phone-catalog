import { PhoneFromServer } from '../../types/Phone';

interface Props {
  phone: PhoneFromServer;
}

export const PhoneSpecs: React.FC<Props> = ({ phone }) => {
  return (
    <ul className="grid-item__characteristics characteristics">
      <li className="characteristics__screen characteristics-info">
        <p className="characteristics-info__key">Screen</p>
        <p className="characteristics-info__value">{phone.screen}</p>
      </li>
      <li className="characteristics__capacity characteristics-info">
        <p className="characteristics-info__key">Resolution</p>
        <p className="characteristics-info__value">{phone.resolution}</p>
      </li>
      <li className="characteristics__ram characteristics-info">
        <p className="characteristics-info__key">Processor</p>
        <p className="characteristics-info__value">{phone.processor}</p>
      </li>
      <li className="characteristics__ram characteristics-info">
        <p className="characteristics-info__key">Biult in memory</p>
        <p className="characteristics-info__value">{phone.capacity}</p>
      </li>
      <li className="characteristics__ram characteristics-info">
        <p className="characteristics-info__key">Camera</p>
        <p className="characteristics-info__value">{phone.camera}</p>
      </li>
      <li className="characteristics__ram characteristics-info">
        <p className="characteristics-info__key">Zoom</p>
        <p className="characteristics-info__value">{phone.zoom}</p>
      </li>
      <li className="characteristics__ram characteristics-info">
        <p className="characteristics-info__key">Cell</p>
        <p className="characteristics-info__value">{phone.cell.join(', ')}</p>
      </li>
    </ul>
  );
};
