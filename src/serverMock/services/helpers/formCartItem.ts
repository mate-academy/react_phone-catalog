import { products } from '../../static';
import { CartItem } from '../../types';

const formProduct = (item: CartItem) => {
  const product = products.find(el => el.id === item.id)!;

  const price = product.priceDiscount
    ? product.priceDiscount
    : product?.priceRegular;
  const total = item.amount * price;

  return {
    product: product,
    amount: item.amount,
    total: total,
  };
};

export { formProduct };
