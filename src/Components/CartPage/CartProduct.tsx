import './CartPage.scss';
import { useEffect, useState, useContext } from 'react';
import { Product } from '../../types/product';
import { BASE_URL } from '../../utils/fetchClient';
import { ProductContext } from '../../contexts/ProductContext';

type Props = {
  product: Product;
};

export const CartProduct: React.FC<Props> = ({ product }) => {
  const {
    image,
    name,
    price,
  } = product;

  const { setProductPrice, cartProducts, setCartProducts } = useContext(ProductContext);

  const [total, setTotal] = useState<number>(1);

  // const handleAddProduct = () => {
  //   setProductPrice((prevPrice) =>
  //     prevPrice + price
  //   )
  // }

  useEffect(() => {
    setProductPrice((prevPrice: number) => prevPrice + price);
  }, [price]);

  const handleAddProduct = () => {
    setTotal((prevTotal) => prevTotal + 1);
    setProductPrice((prevPrice) => prevPrice + price);
  };

  const handleRemoveProduct = () => {
    setTotal((prevTotal) => prevTotal - 1);
    setProductPrice((prevPrice) => prevPrice - price);
  };

  const handleDeleteProduct = (product: Product) => {
    const newWPrice = product.price * total;

    setProductPrice((prevPrice) => prevPrice - newWPrice);
    const updatedProducts = cartProducts.filter(cartProduct => cartProduct !== product);

    setCartProducts(updatedProducts);
  };

  return (
    <div>
      <div className="cart__product">
        <button
          className="cart__close"
          onClick={() => handleDeleteProduct(product)}
        />
        <img className="cart__phone-img" src={`${BASE_URL}/${image}`} />
        <h1 className="cart__name">
          {`${name}`}
          {' '}
          <br />
          (iMT9G2FS/A)
        </h1>
        <div className="cart__button-container">
          <button
            className="cart__button-remove"
            onClick={handleRemoveProduct}
          >
            -
          </button>
          <div className="cart__total">
            {total}
          </div>
          <button
            className="cart__button-add"
            onClick={handleAddProduct}
          >
            +
          </button>
        </div>
        <h1 className="cart__price">{`$${price}`}</h1>
      </div>
    </div>
  );
};
