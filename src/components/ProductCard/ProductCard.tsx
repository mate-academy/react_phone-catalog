import classNames from 'classnames';
import style from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import { ButtonsAddCardFav } from '../ButtonsAddCardFav';
import { useNavigate } from 'react-router-dom';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${product.category}/${product.itemId}`);
  };

  return (
    <>
      {product && (
        <div className={classNames(style.prod_card_container)}>
          <img
            src={product.image}
            alt="product image"
            className={classNames(style.image)}
            onClick={handleClick}
          />

          <p
            className={style.title}
            onClick={handleClick}
          >
            {product.name}
          </p>

          <div className={classNames(style.price_container)}>
            <h3 className={classNames(style.price_full)}>${product.price}</h3>

            <h3 className={classNames(style.price_discount)}>
              ${product.fullPrice}
            </h3>
          </div>

          <div className={classNames(style.specs_container)}>
            <div className={style.spec_row}>
              <p className={style.spec_name}>Screen</p>
              <p className={style.spec_param}>{product.screen}</p>
            </div>

            <div className={style.spec_row}>
              <p className={style.spec_name}>Capacity</p>
              <p className={style.spec_param}>{product.capacity}</p>
            </div>

            <div className={style.spec_row}>
              <p className={style.spec_name}>RAM</p>
              <p className={style.spec_param}>{product.ram}</p>
            </div>
          </div>

          <div className={classNames(style.bts_container)}>
            <ButtonsAddCardFav productId={product.itemId} />
          </div>
        </div>
      )}
    </>
  );
};
