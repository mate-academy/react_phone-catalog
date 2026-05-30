import { Link, useLocation } from 'react-router-dom';

import { setScrollToTop } from '../../features/scroll/scrollSlice';

import { useAppDispatch } from '../../hooks';

import { ProductActions } from '../ProductActions';
import { Specification } from '../Specification';
import { ProductPrice } from '../ProductPrice';

import { Product as ProductType } from '../../types/Product';

import styles from './Product.module.scss';
const {
  prod,
  prod__listPositioning,
  prod__contentWrapper,
  prod__imgWrapper,
  prod__img,
  prod__name,
  prod__priceWrapper,
  prod__line,
  prod__specs,
} = styles;

type Props = {
  product: ProductType;
  discount: boolean;
  isInCategory?: boolean;
};

export const Product = ({ product, discount, isInCategory }: Props) => {
  const dispatch = useAppDispatch();
  const pathname = useLocation().pathname;
  const linkTo = `/catalog/${product.category}/${product.itemId}`;

  // * checking if user inside cart page or favourites page
  // * (to pass state with path for correct back navigation)
  const isInFavourites = pathname.startsWith('/user/favourites');

  const handleProductClick = () => {
    // Scrolling a page on top when going to another page
    dispatch(setScrollToTop('auto'));
  };

  return (
    <div className={`${prod} ${isInCategory && prod__listPositioning}`}>
      <Link
        to={linkTo}
        className={prod__contentWrapper}
        state={
          isInFavourites
            ? { from: 'user', previousPath: pathname }
            : discount && { discount }
        }
        onClick={handleProductClick}
      >
        <div className={prod__imgWrapper}>
          <img
            src={`${import.meta.env.BASE_URL}${product.image}`}
            alt={`${product.image} photo`}
            className={prod__img}
          />
        </div>

        <span className={prod__name}>{product.name}</span>
      </Link>

      <div className={prod__priceWrapper}>
        <ProductPrice
          discountedPrice={product.price}
          fullPrice={product.fullPrice}
          discount={discount}
          context="card"
        />
      </div>

      <div className={prod__line} />

      <div className={prod__specs}>
        <Specification label="Screen" value={product.screen} context="card" />

        <Specification
          label="Capacity"
          value={product.capacity}
          context="card"
        />

        <Specification label="RAM" value={product.ram} context="card" />
      </div>

      <ProductActions product={product} />
    </div>
  );
};
