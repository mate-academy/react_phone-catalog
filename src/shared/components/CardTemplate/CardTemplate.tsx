import { useEffect } from 'react';
import classNames from 'classnames';
import s from './CardTemplate.module.scss';
import { Product } from '../../../types/types';
import { ProductItem } from '../../../types/ProductItem';
import { AddButton } from '../AddButton';
import { useLocation } from 'react-router-dom';
import { normalizeProduct } from '../../utils/normalizeProduct';

type Props = {
  product: Product | ProductItem;
  discount: boolean;
};

export const CardTemplate: React.FC<Props> = ({ product, discount }) => {
  // const navigate = useNavigate();
  const location = useLocation();

  const normalizedProduct = normalizeProduct(product);

  // const handleClick = useCallback(() => {
  //   navigate(`${normalizedProduct.category}/${normalizedProduct.id}`);
  // }, [navigate, normalizedProduct.category, normalizedProduct.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={classNames(s.card_container, s.card)}>
      <a href={`#/${normalizedProduct.category}/${normalizedProduct.id}`}>
        <img
          src={`${normalizedProduct.image}`}
          alt={normalizedProduct.name}
          className={classNames(s.card_image)}
          // onClick={handleClick}
        />
      </a>

      <a
        href={`#/${normalizedProduct.category}/${normalizedProduct.id}`}
        className={s.card_title}
        // onClick={handleClick}
      >
        {normalizedProduct.name}
      </a>

      <div className={classNames(s.price_container, s.price)}>
        <h3 className={classNames(s.price_full)}>
          ${normalizedProduct.priceRegular}
        </h3>

        {discount && (
          <h3 className={classNames(s.price_discount)}>
            &#36;{normalizedProduct.priceDiscount}
          </h3>
        )}
      </div>

      <div className={classNames(s.info_container, s.info)}>
        <div className={s.info_row}>
          <p className={s.info_name}>Screen</p>
          <p className={s.info_param}>{normalizedProduct.screen}</p>
        </div>

        <div className={s.info_row}>
          <p className={s.info_name}>Capacity</p>
          <p className={s.info_param}>{normalizedProduct.capacity}</p>
        </div>

        <div className={s.info_row}>
          <p className={s.info_name}>RAM</p>
          <p className={s.info_param}>{normalizedProduct.ram}</p>
        </div>
      </div>

      <AddButton product={product} />
    </div>
  );
};
