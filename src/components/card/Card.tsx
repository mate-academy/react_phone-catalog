import { useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { setLocalStorageItem } from '../../helpers/util';
import { GlobalContext, selectProduct } from '../../reducer';
import { Product } from '../../types/product';
import { AddToCart } from '../addToCart/AddToCard';
import { AddToFavorite } from '../addToFavorite/AddToFavorite';
import { NavLinkCustom } from '../navLink/NavLinkCustom';
import './card.scss';

type Props = {
  product: Product;
};

export const Card: React.FC<Props> = ({ product }) => {
  const [, dispatch] = useContext(GlobalContext);
  const location = useLocation();
  const { id = '' } = useParams();

  const setSelectProduct = () => {
    dispatch({ type: selectProduct, product });
    setLocalStorageItem('product', product);
  };

  const createPath = () => {
    if (location.pathname === '/') {
      return `${product.type}s/${product.id}`;
    }

    return `${location.pathname.replace(`/${id}`, '')}/${product.id}`;
  };

  return (
    <div className="container-card" data-cy="cardsContainer">
      <img src={`./${product.imageUrl}`} alt="product" className="container-card__product" />
      <NavLinkCustom
        way={createPath()}
        onClick={setSelectProduct}
        classStyle="card-title"
        active
      >
        {product.name}
      </NavLinkCustom>
      <div className="price">
        <span className="price__current">
          $
          {Math.floor(product.price - (product.price / 100) * product.discount)}
        </span>
        {product.discount ? (
          <span className="price__old">
            $
            {product.price}
          </span>
        ) : <></>}
      </div>
      <div className="describe">
        <div className="describe__parametr">
          <span className="category">Screen</span>
          <span className="value">{product.screen}</span>
        </div>
        <div className="describe__parametr">
          <span className="category">Capacity</span>
          <span className="value">
            {product.capacity
              ? `${parseInt(product.capacity, 10) / 1000}GB`
              : 'No data'}
          </span>
        </div>
        <div className="describe__parametr">
          <span className="category">RAM</span>
          <span className="value">
            {' '}
            {product.ram ? `${parseInt(product.ram, 10) / 1000}GB` : 'No data'}
          </span>
        </div>
        <div className="describe__buttons">
          <AddToCart product={product} />
          <AddToFavorite product={product} />
        </div>
      </div>
    </div>
  );
};
