import { useContext, useState } from 'react';
import classNames from 'classnames';
import { useProducts } from '../../context/ProductContext';
import { CartContext } from '../../context/CartContext';

type Props = {
  prodId: string;
};

export const AddToCartButton: React.FC<Props> = ({ prodId }) => {
  const { addToCart, checkAdded } = useContext(CartContext);
  const { products } = useProducts();

  const [isButtonSelected, setIsButtonSelected] = useState(checkAdded(prodId));

  const handleAddToCart = () => {
    const product = products.find(p => p.itemId === prodId);

    if (product) {
      addToCart({
        id: prodId,
        product,
        quantity: 1,
        price: product.price,
      });

      setIsButtonSelected(true);
    }
  };

  return (
    <button
      type="button"
      className={classNames('addToCart', {
        'addToCart--selected': isButtonSelected,
      })}
      onClick={handleAddToCart}
    >
      {isButtonSelected ? <p>Added to cart</p> : <p>Add to cart</p>}
    </button>
  );
};
