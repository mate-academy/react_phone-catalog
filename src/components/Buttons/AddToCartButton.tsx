import { useContext, useState } from 'react';
import classNames from 'classnames';
import { useProducts } from '../../context/ProductContext';
import { CartContext } from '../../context/CartContext';

type Props = {
  prodId: string;
};

export const AddToCartButton: React.FC<Props> = ({ prodId }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isButtonSelected, setIsButtonSelected] = useState(false);
  const { products } = useProducts();
  const { addItemToCart } = useContext(CartContext);
  const handleAddToCart = () => {
    const product = products.find(p => p.itemId === prodId);

    if (product) {
      addItemToCart({
        id: prodId,
        product,
        quantity: 1,
        price: product.price,
      });
    }

    setIsAdded(true);
    setIsButtonSelected(true);
  };

  return (
    <button
      type="button"
      className={classNames('main-button', {
        'main-button--selected': isButtonSelected,
      })}
      onClick={handleAddToCart}
    >
      {isAdded ? <p>Added to cart</p> : <p>Add to cart</p>}
    </button>
  );
};
