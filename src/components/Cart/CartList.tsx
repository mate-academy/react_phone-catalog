import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPath } from '../../helpers/getPath';
import { Product } from '../../types/Product';
import { CartProducts } from '../context/SavedProductsContext';
import { CartQuantity } from './CartQuantity';

type Props = {
  products: Product[];
};

export const CartList:React.FC<Props> = ({ products }) => {
  const { setCartProducts } = useContext(CartProducts);
  const [currentProducts, setCurrentProducts] = useState(products);

  const changeQuantity = (productToChange: Product, newQuantity = 1) => {
    const x = currentProducts.map(product => {
      if (product.id === productToChange.id) {
        const changedProduct = {
          ...productToChange,
          quantity: newQuantity,
        };

        return changedProduct;
      }

      return {
        ...product,
        quantity: product.quantity || 1,
      };
    });

    setCurrentProducts(x);
  };

  const removeProduct = (id: string) => {
    setCurrentProducts(currentProducts.filter(prod => prod.id !== id));
  };

  useEffect(() => {
    setCartProducts(currentProducts);
  }, [currentProducts]);

  return (
    <section className="cart-list">
      {currentProducts.map(product => {
        const {
          id,
          type,
          name,
          imageUrl,
          price,
          discount,
          quantity,
        } = product;

        const discountSum = Math.ceil((price / 100) * discount);
        const realPrice: number = discount > 0
          ? price - discountSum
          : price;

        return (
          <div key={id} className="cart-list__products">

            <button
              className="cart-list__products__delete"
              data-cy="cartDeleteButton"
              type="button"
              onClick={() => removeProduct(id)}
            >
              x
            </button>

            <img
              className="cart-list__products__image"
              alt={name}
              src={imageUrl}
            />

            <Link
              className="cart-list__products__name"
              to={getPath({ type, id })}
            >
              <p>{name}</p>
            </Link>

            <CartQuantity product={product} changeQuantity={changeQuantity} />

            <p className="cart-list__products__price">
              { quantity ? `$${realPrice * quantity}` : `$${realPrice}` }
            </p>

          </div>
        );
      })}

    </section>
  );
};
