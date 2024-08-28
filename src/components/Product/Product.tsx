import { Link } from 'react-router-dom';
import { ProductType } from '../../types/ProductType';
import { ProductPrices } from '../ProductPrices';
import { ProductButtons } from '../ProductButtons';
import { ProductSpecs } from '../ProductSpecs';

type Props = {
  className?: string;
  product: ProductType;
  showDiscount?: boolean;
};

export const Product: React.FC<Props> = ({
  className = '',
  product,
  showDiscount = true,
}) => {
  const hasDiscount = showDiscount && product.price < product.fullPrice;

  return (
    <article className={`product ${className}`.trim()}>
      <Link
        className="product__img-link"
        to={`/${product.category}/${product.id}`}
      >
        <img className="product__img" src={product.image} alt={product.name} />
      </Link>
      <Link
        className="product__title"
        to={`/${product.category}/${product.id}`}
      >
        {product.name}
      </Link>

      <ProductPrices
        className={'product__product-prices'}
        product={product}
        hasDiscount={hasDiscount}
      />

      <ProductSpecs
        product={product}
        specs={[
          { key: 'screen', label: 'Screen' },
          { key: 'capacity', label: 'Capacity' },
          { key: 'ram', label: 'RAM' },
        ]}
      />

      <ProductButtons product={product} />
    </article>
  );
};
