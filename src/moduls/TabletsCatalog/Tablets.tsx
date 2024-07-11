import { useContext } from 'react';
import { Catalog } from '../../componentsApp/Catalog/Catalog';
import { StateContext } from '../../context/ContextReducer';
import './Tablets.scss';

export const TabletsCatalog: React.FC = () => {
  const { Tablets } = useContext(StateContext);

  return (
    <div className="Tablets-catalog">
      <div className="Tablets-catalog__items">
        <Catalog devices={Tablets} titleCatalog="Tablets" nonCatalog={false} />
      </div>
    </div>
  );
};
