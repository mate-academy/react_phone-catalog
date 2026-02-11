import { Phone } from '../../types/Phone';
import tabletsFromJson from '../../../public/api/tablets.json';
import { Link } from 'react-router-dom';
import home from '../Phone/phoneImg/Home.svg';
import vector from '../Phone/phoneImg/Vector (PhonePage).svg';
import '../Phone/phonePage.scss';
import { Catalog } from '../../components/Catalog/Catalog';
import { fromPhone } from '../../types/mappers';

export const TabletPage: React.FC = () => {
  const tablets = tabletsFromJson as Phone[];

  return (
    <>
      <div className="phone">
        <div className="phone__header">
          <Link to="/" className="phone__header-back">
            <img src={home} className="phone__header-home" />
          </Link>
          <div className="phone__heder-arrow">
            <img src={vector} className="phone__header-vector" />
          </div>
          <div className="phone__header-title">Tablets</div>
        </div>
        <Catalog
          title="Tablets"
          totalLabel={`${tablets.length} models`}
          items={tablets}
          mapToCardItem={fromPhone}
        />
      </div>
    </>
  );
};
