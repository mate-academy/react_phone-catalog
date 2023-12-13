import { useContext } from 'react';
import { Filtration } from '../../components/Filtration';
import { ProductsList } from '../../components/ProductsList';
import { ProductsContext } from '../../context/ProductsContext';
import { getProductsByType } from '../../helpers/getProductsByType';
import { Title } from '../../components/Title';
import './PhonesPage.scss';
import { HistoryLinks } from '../../components/HistoryLinks';

export const PhonesPage = () => {
  const { products } = useContext(ProductsContext);

  const typeProducts = getProductsByType(products, 'phone');

  return (
    <div className="PhonesPage">
      <HistoryLinks links={[{ title: 'Phones', link: '/Phones' }]} />
      <div className="PhonesPage__title">
        <Title title="Mobile phones" />
        <p className="PhonesPage__title-count">
          {`${typeProducts.length} models`}
        </p>
      </div>
      <Filtration total={typeProducts.length}>
        <ProductsList products={typeProducts} />
      </Filtration>
    </div>
  );
};
