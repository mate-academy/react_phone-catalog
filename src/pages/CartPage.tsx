import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/getProducts';
import { CartContext } from '../context/CartProvider';
import { Product } from '../types/Product';
import { ReactComponent as DeleteIcon }
  from '../assets/images/icons/cancel-icon.svg';
import { ReactComponent as PlusIcon }
  from '../assets/images/icons/plus-icon.svg';
import { ReactComponent as MinusIcon }
  from '../assets/images/icons/minus-icon.svg';
import SquareButton from '../components/SquareButton';
import PrimaryButton from '../components/PrimaryButton';
import BackButton from '../components/BackButton';
import { CartItemType } from '../types/CartItemType';
import NotFaundImg from '../assets/images/no-result.png';

const CartPage = () => {
  const [productList, setProductList] = useState<Product[] | []>([]);
  const {
    getItemQuantity,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    cart,
  } = useContext(CartContext);

  const fethProductLIst = async () => {
    const res = await getProducts();

    setProductList(res.map((item: Product) => ({
      ...item,
      newPrice: (item.price * item.discount) / 100,
    })));
  };

  useEffect(() => {
    fethProductLIst();
  }, []);

  const totalPrice = () => {
    return [...cart]
      .reduce((accum: number, product : CartItemType) => {
        if (getItemQuantity(product.id)) {
          const price = productList.find(item => (
            item.id === product.id))?.newPrice || 0;

          return accum + (price * product.quantity);
        }

        return accum;
      }, 0);
  };

  const getTotalQuantity = () => {
    return [...cart]
      .reduce((accum: number, product : CartItemType) => {
        if (getItemQuantity(product.id)) {
          return accum + product.quantity;
        }

        return accum;
      }, 0);
  };

  const totalValue = totalPrice();
  const totalQuantity = getTotalQuantity();

  if (!cart.length) {
    return (
      <div className="ProductList__notFound-container">
        <h1>Your cart is empty</h1>
        <img src={NotFaundImg} alt="img-not-faund" />
      </div>
    );
  }

  return (
    <section className="CartPage">
      <BackButton />
      <h1 className="CartPage__title">
        Cart
      </h1>
      <div className="CartPage__productsContainer">
        <ul className="CartPage__list">
          {cart.map((productId: CartItemType) => {
            const product = productList.find(item => item.id === productId.id);

            if (!product) {
              return <p key={productId.id}>Product Not found</p>;
            }

            const productQuantity = getItemQuantity(product.id);

            return (
              <li key={product.id} className="CartPage__item">
                <button
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                  className="CartPage__deleteBtn"
                >
                  <DeleteIcon />
                </button>
                <Link
                  to={`/phones/${product.id}`}
                  className="CartPage__linkContainer"
                >
                  <img
                    src={`/${product.imageUrl}`}
                    alt="img-product"
                    className="CartPage__img"
                  />
                  <p className="CartPage__productName">{product.name}</p>
                </Link>
                <SquareButton
                  OnClick={() => decreaseQuantity(product.id)}
                  classModificator={productQuantity === 1
                    ? 'square-button--disabled'
                    : ''}
                >
                  <MinusIcon />
                </SquareButton>
                <p className="CartPage__quantity">
                  {productQuantity}
                </p>
                <SquareButton
                  OnClick={() => increaseQuantity(product.id)}
                >
                  <PlusIcon />
                </SquareButton>
                <p className="CartPage__totalPrice">
                  {`$ ${productQuantity * product.newPrice}`}
                </p>
              </li>
            );
          })}
        </ul>
        <div className="CartPage__totalCheckContainer">
          <h2 className="CartPage__totalPriceAll">{`$ ${totalValue}`}</h2>
          <p className="CartPage__totalItemQuantity">
            {`Total for ${totalQuantity} ${totalQuantity > 1 ? 'items' : 'item'}`}
          </p>
          <PrimaryButton
            OnClick={() => 'click'}
            classModificator="primary-button--big"
          >
            Checkout
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
