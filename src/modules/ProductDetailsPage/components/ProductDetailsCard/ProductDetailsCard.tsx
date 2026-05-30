import s from './ProductDetailsCard.module.scss';
import { ProductOptions } from '../ProductOptions';
import { ProductGallery } from '../ProductGallery';
import { ProductDetails } from '../../../../utils/types/ProductDetails';
import { AddToCartButton } from '../../../shared/AddToCartButton';
import { AddToFavButton } from '../../../shared/AddToFavButton';
import { ProductFeatures } from '../../../shared/ProductFeaturesTable';

type Props = {
  product: ProductDetails;
};

export const ProductDetailsCard: React.FC<Props> = ({ product }) => {
  const {
    name,
    id,
    images,
    priceDiscount,
    priceRegular,
    screen,
    capacity,
    processor,
    ram,
    colorsAvailable,
    capacityAvailable,
  } = product;
  const features = [
    { name: 'Screen', value: screen },
    { name: 'Capacity', value: capacity },
    { name: 'Proccessor', value: processor },
    { name: 'RAM', value: ram },
  ];

  return (
    <article className={s.productCard}>
      <h2 className={s.productName}>{name}</h2>

      <ProductGallery images={images} name={name} />

      <div className={s.productInfo}>
        <ProductOptions
          productId={product.id}
          colors={colorsAvailable}
          capacities={capacityAvailable}
        />

        <div className={s.productActions}>
          <div className={s.productPrice}>
            <p>${priceDiscount}</p>
            <p className={s.productFullPrice}>${priceRegular}</p>
          </div>

          <div className={s.bottomButtonsWrapper}>
            <AddToCartButton productId={id} />
            <AddToFavButton productId={id} />
          </div>
        </div>

        <ProductFeatures features={features} />
      </div>
    </article>
  );
};
