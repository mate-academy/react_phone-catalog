import { useContext } from 'react';
import { Catalog } from '../../componentsApp/Catalog/Catalog';
import { StateContext } from '../../context/ContextReducer';

export const AccessoriesCatalog: React.FC = () => {
  const { Accessories } = useContext(StateContext);

  return (
    <div className="Tablets-catalog">
      <div className="Tablets-catalog__items">
        <Catalog
          devices={Accessories}
          titleCatalog="Accessories"
          nonCatalog={false}
        />
      </div>
    </div>
  );
};
