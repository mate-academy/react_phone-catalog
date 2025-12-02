import accessoriesFromJson from '../../../public/api/accessories.json';
import { Link } from 'react-router-dom';
import home from '../Phone/phoneImg/Home.svg';
import vector from '../Phone/phoneImg/Vector (PhonePage).svg';
import '../Phone/phonePage.scss';
import { Catalog } from '../../components/Catalog/Catalog';
import { fromAccessories } from '../../types/mappers';
import { Accessories } from '../../types/Accessories';

export const AccessoriesPage = () => {
  const accessories = accessoriesFromJson as Accessories[];

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
          title="Accessories"
          totalLabel={`${accessories.length} models`}
          items={accessories}
          mapToCardItem={fromAccessories}
        />
      </div>
    </>
  );
};
