import { Link, useSearchParams } from 'react-router-dom';
import style from './ProductCard.module.scss';
import { useContext } from 'react';
import { IconId, IconStyles } from '../../types/icons';
import { Button } from '../../shared/ui/Button';
import { ProductSpecs } from '../../shared/components/ProductSpecs';
import { ProductContext } from '../../store/ProductContext';
import { useCart } from '../../store/CartContext';
import { ProdCard } from '../../types/Product';
import { useFavourites } from '../../store/FavouritesContext';
import { ButtonAdd } from '../../shared/ui/ButtonAdd';

type ProductCardProps = {
  product?: ProdCard;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const cart = useCart();
  const fav = useFavourites();
  const [searchParams] = useSearchParams();
  const { products } = useContext(ProductContext);

  if (!product) {
    return null;
  }

  const { id, img, name, year, price, fullPrice, specs } = product;

  const liked = fav.state.favourite.some(prod => prod.id === id);
  const icon = liked ? IconId.HeartFilled : IconId.Heart;
  const prod = products.find(p => p.itemId === id);
  const isYear = year ? year : prod?.year;
  const category = prod?.category;

  if (!category) {
    return null;
  }

  return (
    <div className={style.cardContainer} key={id}>
      <Link
        to={{
          pathname: `/${category}/${id}`,
          search: searchParams.toString(),
        }}
        className={style.imgLink}
      >
        <img src={img} alt={name} className={style.cardImg} />
      </Link>

      <Link
        to={{
          pathname: `/${category}/${id}`,
          search: searchParams.toString(),
        }}
        className={style.titleLink}
      >
        <h2 className={style.cardTitle}>{name + ' ' + `(${isYear})`}</h2>
      </Link>
      {price ? (
        <div className={style.priceWrapper}>
          <p className={style.priceDiscount}>${price}</p>
          <p className={style.priceRegularSmall}>${fullPrice}</p>
        </div>
      ) : (
        <p className={style.priceRegular}>${fullPrice}</p>
      )}

      <div className={style.productSpecs}>
        {specs && (
          <ProductSpecs
            specs={specs.map(spec => ({
              name: spec.name,
              value: spec.value,
            }))}
          />
        )}
      </div>

      <div className={style.cardButtons}>
        <ButtonAdd
          title="Add to cart"
          onClick={() => cart.addToCard(product)}
        />

        <Button
          onClick={() => fav.toggleFav(product)}
          iconId={icon}
          filled={liked ? IconStyles.Filled : undefined}
          type="like"
        />
      </div>
    </div>
  );
};
