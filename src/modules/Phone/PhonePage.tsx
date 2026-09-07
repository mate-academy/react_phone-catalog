import { Phone } from '../../types/Phone';
import phonesFromJson from '../../../public/api/phones.json';
import { Link } from 'react-router-dom';
import home from './phoneImg/Home.svg';
import vector from './phoneImg/Vector (PhonePage).svg';
import './phonePage.scss';
import { Catalog } from '../../components/Catalog/Catalog';
import { fromPhone } from '../../types/mappers';

export const PhonePage: React.FC = () => {
  const phones = phonesFromJson as Phone[];

  return (
    <>
      <div className="phone">
        <div className="phone__header">
          <Link to="/" className="phone__header-back">
            <img src={home} alt="Home" className="phone__header-home" />
          </Link>
          <div className="phone__heder-arrow">
            <img src={vector} className="phone__header-vector" />
          </div>
          <div className="phone__header-title">Phones</div>
        </div>
        <Catalog
          title="Mobile phones"
          totalLabel={`${phones.length} models`}
          items={phones}
          mapToCardItem={fromPhone}
        />
      </div>
    </>
  );
};
