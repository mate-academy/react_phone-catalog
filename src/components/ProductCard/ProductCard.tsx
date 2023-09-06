import './ProductCard.scss';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useRef } from 'react';
import { Product } from '../../types/Product';
import { ProductSection } from '../../types/ProductSection';
import { ButtonCart } from '../ButtonCart/ButtonCart';
import { ButtonFav } from '../ButtonFav/ButtonFav';
import { CardWidthContext } from '../contexts/CardWidthContextProvider';

type Props = {
  product: Product,
  title?: ProductSection,
  // onCardWidthChange: (width: number) => void;
};

export const ProductCard: React.FC<Props> = ({
  product,
  title,
  // onCardWidthChange,
}) => {
  const {
    screen,
    capacity,
    ram,
    price,
    fullPrice,
    name,
    category,
    phoneId,
    image,
  } = product;

  const cardRef = useRef<HTMLDivElement>(null);
  const { setCardWidth } = useContext(CardWidthContext);

  useEffect(() => {
    const cardWidth = cardRef.current?.offsetWidth || 272;

    setCardWidth(cardWidth);
  }, [cardRef, setCardWidth]);

  return (
    <div
      ref={cardRef}
      className="product-card"
      data-cy="cardsContainer"
    >
      <Link
        className="product-card__link"
        to={`/${category}/${phoneId}`}
      >
        <img className="product-card__img" src={`newImg/${image}`} alt={name} />
        <div className="product-card__title">
          {name}
        </div>
        <div className="product-card__price">
          {title === ProductSection.NewBrand ? (
            <div className="product-card__price-regular">
              {`$${fullPrice}`}
            </div>
          ) : (
            <>
              <h2 className="product-card__price-regular">
                {`$${price}`}
              </h2>

              <div className="product-card__price-discount">
                {`$${fullPrice}`}
              </div>
            </>
          )}

        </div>

      </Link>

      <div className="product-card__properties">
        <div className="product-card__property">
          <p className="product-card__property-title">Screen</p>
          <p className="product-card__property-value">{screen}</p>
        </div>

        <div className="product-card__property">
          <p className="product-card__property-title">Capacity</p>
          <p className="product-card__property-value">{capacity}</p>
        </div>

        <div className="product-card__property">
          <p className="product-card__property-title">Ram</p>
          <p className="product-card__property-value">{ram}</p>
        </div>
      </div>

      <div className="product-card__buttons">
        <div className="product-card__button-cart">
          <ButtonCart
            product={product}
          />
        </div>

        <div className="product-card__button-fav">
          <ButtonFav
            product={product}
          />
        </div>
      </div>
    </div>
  );
};
