import './cartPage.scss';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AllProductsType } from '../../types/AllProductsType';
import { AddAndFavoritesContext } from '../contexts/AddAndFavoritesContext';

export const CartPage = () => {
  const context = useContext(AddAndFavoritesContext);
  const { cart, changeQuantity} = context;

  const [products, setProducts] = useState<AllProductsType[]>([]);
  const [allProducts, setAllProducts] = useState<AllProductsType[]>([]);

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => res.json())
      .then((data: AllProductsType[]) => setAllProducts(data));
  }, []);

  useEffect(() => {
    console.log('cart:', cart);
    console.log('allProducts:', allProducts);

    const productsInCart = allProducts.filter(product =>
      cart.some(item => item.id === product.id)
    );

    console.log('productsInCart:', productsInCart);
    setProducts(productsInCart);
  }, [cart, allProducts]);

  // const cartItem = cart.find(item => item.id === product.id);
  // const quantity = cartItem?.quantity ?? 1;

  return (
    <div className="cart-page">
      <div className="button-back-block">
        <Link to="/" className="icon">
          <img
            src="/img/icons/ArrowLeft.svg"
            alt="arrow icon"
            className="icon"
          />
        </Link>

        <Link to="/" className="breadcrumbs-link">
          <div className="back-text">Back</div>
        </Link>
      </div>

      <div className="page-title">Cart</div>

      {products.map(product => {
        const modelPhoto = product.image;
        const modelName = product.name;
        const price = product.price;
        // const { id, count } = cartItem;

        const cartItem = cart.find(item => item.id === product.id);
        const quantity = cartItem?.quantity ?? 1;

        return (
          <div className="carts-card" key={product.id}>
            <div className="info-row">
              <div className="delete" onClick={()=> changeQuantity(product.id, 'delete')}>
                <img src="./img/icons/Close.svg" alt="delete item" />
              </div>

              <Link to="/" className="model-link photo">
                <img src={modelPhoto} alt="model photo" />
              </Link>

              <Link to="/" className="model-link modelName">
                {modelName}
              </Link>
              {/* {console.log('-==cart.length==-', cart.length)} */}
            </div>

            {/* <div className="calculation-row"> */}
              <div className="calc-box">
                <div
                  className="minus calc-button"
                  onClick={()=> changeQuantity(product.id, 'minus')}
                >
                  <img src="./img/icons/Minus.svg" alt="minus" />
                </div>

                <div className='count'>{quantity}</div>

                <div
                  className="plus calc-button"
                  onClick={() => changeQuantity(product.id, 'plus')}
                >
                  <img src="./img/icons/Plus.svg" alt="plus" />
                </div>
              </div>
            {/* </div> */}

            {/* <div className='price'>
              ${price}
            </div> */}
            <h3 className='price'>
              ${price * quantity}
            </h3>
          </div>
        );
      })}
    </div>
  );
};
