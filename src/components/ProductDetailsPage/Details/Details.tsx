import { SpecTable } from '@components/SpecTable';
import { FavButton, PrimaryButton } from '@components/UI';
import { useCart } from '@contexts/cartContext';
import { getProductSpecs } from '@helpers/object';
import { ProductDetails } from '@typings/productDetails';
import { CapacityPicker, ColorPicker, ProductGallery } from '..';
import './Details.scss';

type DetailsProps = {
  selectedProduct: ProductDetails;
};

export const Details = ({ selectedProduct }: DetailsProps) => {
  const {
    id,
    images,
    name,
    colorsAvailable,
    capacityAvailable,
    priceDiscount,
    priceRegular,
  } = selectedProduct;
  const { addCartItem, cartItems } = useCart();
  const isInCart = cartItems.some(item => item.id === id);

  return (
    <>
      <ProductGallery key={id} images={images} name={name} />

      <div className="details">
        <ColorPicker colors={colorsAvailable} productId={id} />
        <CapacityPicker capacities={capacityAvailable} productId={id} />

        <p className="details__price">
          {`$${priceDiscount}`}
          <span className="details__price--strike">{`$${priceRegular}`}</span>
        </p>

        <div className="details__controls">
          <PrimaryButton
            isActive={isInCart}
            onClick={() => addCartItem(selectedProduct)}
            width={263}
            height={48}
          >
            Add to cart
          </PrimaryButton>

          <FavButton product={selectedProduct} productId={id} size={48} />
        </div>

        <SpecTable
          specifications={getProductSpecs(selectedProduct)}
          specCount={4}
        />
      </div>
    </>
  );
};
