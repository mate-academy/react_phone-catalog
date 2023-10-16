import { Link } from 'react-router-dom';
import { Product } from '../../../helpers/types/Product';
import { PRODUCT_LINK } from '../../../helpers/constants/Links';
import { OldPrice } from '../OldPrice';
import { ProductButtons } from './ProductButtons';
import { formatInches, formatMb } from '../../../helpers/functions/Functions';
import { ProductTechSpec } from '../../../helpers/types/ProductTechSpec';
import { ProductSpecsList } from './product-specs/ProductSpecsList';

type ProductCardProps = {
  product: Product
};

export const ProductCard = ({
  product,
}: ProductCardProps) => {
  const {
    imageUrl,
    name,
    price,
    discountedPrice,
    screen,
    capacity,
    ram,
    id,
  } = product;

  const newPrice = `$${discountedPrice}`;
  const displayedScreen = formatInches(screen);
  const displayedCapacity = formatMb(capacity);
  const displayedRam = formatMb(ram);
  const cardFullPageLink = `${PRODUCT_LINK}/${id}`;
  const specs: ProductTechSpec[] = [
    {
      name: 'Screen',
      value: displayedScreen,
    },
    {
      name: 'Capacity',
      value: displayedCapacity,
    },
    {
      name: 'Ram',
      value: displayedRam,
    },
  ];

  return (
    <li className="product-card">
      <Link className="product-card__link" to={cardFullPageLink}>
        <img
          className="product-card__image"
          src={imageUrl}
          alt="Product"
        />

        <p className="product-card__name">{name}</p>

        <div className="product-card__prices">
          <h2 className="product-card__current-price">{newPrice}</h2>

          {discountedPrice < price && (
            <OldPrice>{price}</OldPrice>
          )}
        </div>

        <ProductSpecsList
          isBig={false}
          listClasses="product-card__details"
          specs={specs}
        />
      </Link>

      <div className="product-card__buttons">
        <ProductButtons product={product} />
      </div>
    </li>
  );
};
