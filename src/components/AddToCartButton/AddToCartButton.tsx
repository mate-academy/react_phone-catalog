import { useContext } from 'react';
import { CatalogContext } from '../../context';
import { CartAction } from '../../enums/enums';
import { getSalePrice } from '../../helpers/helpers';
import { Product } from '../../types/Product';
import { Button } from '../Button';

type Props = {
  height: string;
  product: Product;
};

export const AddToCartButton: React.FC<Props> = ({ height, product }) => {
  const { cart, dispatchCart } = useContext(CatalogContext);
  const isAddedToCart = cart.some(item => item.id === product.id);
  const onCartAdd = ({
    id,
    imageUrl,
    name,
    price,
    discount,
  }: Product) => {
    const finalPrice = getSalePrice(price, discount);

    if (isAddedToCart) {
      dispatchCart({ type: CartAction.REMOVE, payload: id });

      return;
    }

    const item = {
      id,
      imageUrl,
      quantity: 1,
      product: name,
      price: finalPrice,
    };

    dispatchCart({ type: CartAction.ADD, payload: item });
  };

  return (
    <Button
      width="100%"
      height={`${height}`}
      handler={() => onCartAdd(product)}
      type={isAddedToCart
        ? 'button__action button__action--active'
        : 'button__action'}
    >
      {isAddedToCart ? 'Added to cart' : 'Add to cart'}
    </Button>
  );
};
