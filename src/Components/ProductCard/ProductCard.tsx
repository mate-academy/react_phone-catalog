import { NavLink } from 'react-router-dom';
import { Product } from '../types/Product';
import { ItemTech } from '../ItemTech';
import { ButtonFavourite } from '../ButtonFav/ButtonFavourite';
import { ButtonAddToCart } from '../ButtonAdd/ButtonAdd';
import './ProductCard.scss';

type Props = {
  product: Product;
  fullPrice?: boolean;
  basePath?: string;
};

export const ProductCard: React.FC<Props> = ({
  product,
  fullPrice,
  basePath = '',
}) => {
  const url = basePath.concat(product.itemId);

  const ItemTechList = [
    {
      title: 'Screen',
      value: product.screen,
    },
    {
      title: 'Capacity',
      value: product.capacity,
    },
    {
      title: 'RAM',
      value: product.ram,
    },
  ];

  return (
    <div className="product-card">
      <div className="product-card__content">
        <NavLink className={'product-card__link'} to={url}>
          <img
            src={product.image}
            alt={product.name}
            className="product-card__image"
          />
        </NavLink>
        <NavLink className={'product-card__title'} to={url}>
          {product.name}
        </NavLink>
        <div className="product-card__price">
          <p className="product-card__price--discount">{`$${product.price}`}</p>
          {fullPrice && (
            <p className="product-card__price--full">{`$${product.fullPrice}`}</p>
          )}
        </div>
      </div>

      <ItemTech itemTech={ItemTechList} variant="card" />

      <div className="product-card__buttons">
        <ButtonAddToCart addedProduct={product} />
        <ButtonFavourite favourite={product} />
      </div>
    </div>
  );
};
