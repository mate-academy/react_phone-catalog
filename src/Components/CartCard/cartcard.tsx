import { useState, useEffect } from 'react';
import { useCartContext } from '../cartcontext/cartcontext';
import './cartcard.scss';
import { Product } from '../ProductCard/types';

interface CartCardProps {
  productId: string;
  onRemoveFromCart: (productId: string) => void;
}

const CartCard: React.FC<CartCardProps> = ({ productId }) => {
  const { cartProducts, addToCart, removeFromCart } = useCartContext();
  const [product, setProduct] = useState<Product | null>(null);

  const getCounterForProduct = () => {
    const cartProduct = cartProducts.find(
      (item: Product) => item.id === productId,
    );

    return cartProduct ? cartProduct.quantity : 0;
  };

  useEffect(() => {
    fetch(
      'https://mate-academy.github.io/react_phone-catalog/api/products.json',
    )
      .then((response) => response.json())
      .then((data: Product[]) => {
        const foundProduct = data.find((item) => item.id === productId);

        if (foundProduct) {
          setProduct(foundProduct);
        }
      })
      .catch((error) => setProduct(error));
  }, [productId]);

  if (!product) {
    return null;
  }

  const handleRemoveFromCartClick = () => {
    removeFromCart(productId);
  };

  const handleAddClick = () => {
    addToCart(productId);
  };

  const handleRemoveClick = () => {
    if (getCounterForProduct() > 1) {
      removeFromCart(productId);
    }
  };

  const totalprice = () => `${product.price * getCounterForProduct()}$`;

  return (
    <div className="cart-card">
      <button type="button" className="x" onClick={handleRemoveFromCartClick}>
        <img src="img\Close.svg" alt="close" />
      </button>
      <img src={product.imageUrl} className="img" alt={product.name} />
      <div className="name">{product.name}</div>
      <div className="buttons-holder1">
        <button type="button" className="plusminus" onClick={handleRemoveClick}>
          <img src="img\Minus.svg" className="" alt="minus" />
        </button>
        <div>{getCounterForProduct()}</div>
        <button type="button" className="plusminus" onClick={handleAddClick}>
          <img src="img\Plus.svg" className="" alt="plus" />
        </button>
      </div>
      <div className="totalprice">{totalprice()}</div>
    </div>
  );
};

export default CartCard;
