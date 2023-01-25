import { useLocation } from 'react-router-dom';
import BreadCrumbs from '../components/BreadCrumbs';
import ProductList from '../components/ProductList';
import { Product } from '../types/Product';

type Props = {
  list: Product[];
  title: string;
  showSorting?: boolean;
};

const ProductPage: React.FC<Props> = ({
  list,
  title,
  showSorting = true,
}) => {
  const { pathname } = useLocation();

  return (
    <section className="ProductPage page__section ">
      <div className="ProductPage__bredcrumps">
        <BreadCrumbs location={pathname} />
      </div>
      <h1 className="ProductPage__title">{title}</h1>
      <ProductList
        list={list}
        showSorting={showSorting}
      />
    </section>
  );
};

export default ProductPage;
