import { NavLink } from 'react-router-dom';
import { Product } from '../../types/product';
import './Product.scss';
import { BASE_URL } from '../../utils/fetchClient';
import { ActionButtons } from '../AddFavourite/ActionButtons';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    // id,
    // category,
    phoneId,
    // itemId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    // color,
    ram,
    // year,
    image,
    // count,
  } = product;

  // const { favouriteProducts, setFavouriteProducts } = useContext(ProductContext);

  return (
    <div className="product__card">
      <NavLink
        to={`/phones/${phoneId}`}
      >
        <img
          src={`${BASE_URL}/${image}`}
          className="product-img"
          alt={phoneId}
        />
      </NavLink>
      <h2 className="product__name">{`${name} (iMT9G2FS/A)`}</h2>
      <div className="product__price-container">
        <h1 className="product__price">{`$${price}`}</h1>
        <h1 className="product__fullprice">{`$${fullPrice}`}</h1>
      </div>
      <div className="product__information">
        <div className="product__charact-container">
          <p className="product__charact">Screen</p>
          <h3 className="product__data">{screen}</h3>
        </div>
        <div className="product__charact-container">
          <p className="product__charact">Capacity</p>
          <h3 className="product__data">{capacity}</h3>
        </div>
        <div className="product__charact-container">
          <p className="product__charact">RAM</p>
          <h3 className="product__data">{ram}</h3>
        </div>
      </div>
      <ActionButtons product={product} />
    </div>
  );
};
