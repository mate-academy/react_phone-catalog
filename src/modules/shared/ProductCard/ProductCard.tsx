import { Link, useLocation } from 'react-router-dom';
import s from './ProductCard.module.scss';
import { Product } from '../../../utils/types/Product';
import { AddToCartButton } from '../AddToCartButton';
import { AddToFavButton } from '../AddToFavButton';
import { ProductFeatures } from '../ProductFeaturesTable';
import { BASE_URL } from '../../../utils/variables/base';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const location = useLocation();
  const {
    name,
    category,
    itemId,
    id,
    image,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
  } = product;

  const features = [
    { name: 'Screen', value: screen },
    { name: 'Capacity', value: capacity },
    { name: 'RAM', value: ram },
  ];

  return (
    <article className={s.productCard} key={id}>
      <Link
        to={`/${category}/${itemId}`}
        className={s.productLink}
        state={{ from: location.pathname }}
      >
        <div className={s.imgWrapper}>
          <img
            src={`${BASE_URL}${image}`}
            alt={name}
            className={s.productImg}
          />
        </div>
        <span className={s.productName}>{name}</span>
      </Link>

      <div className={s.productPrice}>
        <p>${price}</p>
        <p className={s.productFullPrice}>${fullPrice}</p>
      </div>

      <span className={s.divider}></span>

      <ProductFeatures features={features} />

      <div className={s.bottomButtonsWrapper}>
        <AddToCartButton productId={itemId} />
        <AddToFavButton productId={itemId} />
      </div>
    </article>
  );
};
