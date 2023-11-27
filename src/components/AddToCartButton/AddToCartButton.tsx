import { useCallback, useContext, useMemo } from 'react';
import classNames from 'classnames';
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
  const isAddedToCart = useMemo(
    () => cart.some(item => item.id === product.id), [cart, product.id],
  );
  const onCartAdd = useCallback(({
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
  }, [cart]);

  return (
    <Button
      width="100%"
      height={`${height}`}
      handler={() => onCartAdd(product)}
      type={classNames(
        'button__action',
        { 'button__action--active': isAddedToCart },
      )}
    >
      {isAddedToCart ? 'Added to cart' : 'Add to cart'}
    </Button>
  );
};
