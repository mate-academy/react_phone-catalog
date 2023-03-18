import { useContext, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Dropdown } from '../../components/dropdown/Dropdown';
import { Way } from '../../components/way/Way';
import { GlobalContext } from '../../reducer';
import { Product } from '../../types/product';
import { Card } from '../../components/card/Card';
import './productCatalog.scss';

export const ProductCatalog = () => {
  const { pathname } = useLocation();
  const [sortBy, setSortBy] = useState('Name');
  const [items, setItems] = useState('16');
  const [state] = useContext(GlobalContext);

  const renderTitle = () => {
    if (pathname.includes('phones')) {
      return 'Mobile phones';
    }

    if (pathname.includes('tablets')) {
      return 'Tablets';
    }

    return 'Accessories';
  };

  const renderFilterList = useMemo(() => {
    if (pathname.includes('phones')) {
      return state.catalogsProducts.filter((el:Product) => el.type === 'phone');
    }

    if (pathname.includes('tablets')) {
      return state.catalogsProducts
        .filter((el:Product) => el.type === 'tablet');
    }

    return state.catalogsProducts
      .filter((el:Product) => el.type === 'accessorie');
  }, [pathname, state.catalogsProducts]);

  return (
    <section className="products">
      <Way />
      <div className="products__describe">
        <h1>{renderTitle()}</h1>
        <span>
          {renderFilterList.length}
          {' '}
          model
        </span>
      </div>
      <div className="products__dropdowns">
        <div className="drop-first">
          <h3>Sort by</h3>
          <Dropdown
            listOptions={['Name', 'Price', 'Ram', 'Screen']}
            selected={sortBy}
            choosSelected={setSortBy}
          />
        </div>
        <div className="drop-second">
          <h3>Items on page</h3>
          <Dropdown
            listOptions={['16', '8', '4']}
            selected={items}
            choosSelected={setItems}
          />
        </div>
      </div>
      <div className="pagination">
        {renderFilterList.map((el:Product) => (
          <div className="pagination__wrapper-card" key={el.age}>
            <Card
              product={el}
              move={0}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
