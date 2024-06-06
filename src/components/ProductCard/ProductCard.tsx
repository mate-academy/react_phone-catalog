import { NavLink } from 'react-router-dom';
import { Product } from '../../types/Product';
import './ProductCard.scss';
import '../../styles/utils/typography.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="product__card">
      <NavLink to={`/phones/${product.itemId}`}>
        <img src="" className="product-img" alt={product.itemId} />
      </NavLink>

      <p className="product__name">{`${product.name} (iMT9G2FS/A)`}</p>

      <div className="product__price-container">
        <h3 className="product__price">{product.price}</h3>
        <h3 className="product__fullprice">{product.fullPrice}</h3>
      </div>

      <div className="product__information">
        <div className="product__charact-container">
          <p className="product__charact">Screen</p>
          <h3 className="product__data">{product.fullPrice}</h3>
        </div>

        <div className="product__charact-container">
          <p className="product__charact">Capacity</p>
          <h3 className="product__data">{product.capacity}</h3>
        </div>

        <div className="product__charact-container">
          <p className="product__charact">RAM</p>
          <h3 className="product__data">{product.ram}</h3>
        </div>
      </div>

      {/* <ActionButtons product={product} /> */}
    </div>
  );
};
