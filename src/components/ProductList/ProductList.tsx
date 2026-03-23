import './ProductList.scss';
import { Phone } from '../../types/Phone';
import ProductCard from '../ProductCard/ProductCard';

type ProductListProps = {
  phones: Phone[];
};

const ProductList = ({ phones }: ProductListProps) => {
  return (
    <div className="product__list">
      {phones.map(phone => (
        <ProductCard key={phone.id} phone={phone} />
      ))}
    </div>
  );
};

export default ProductList;
