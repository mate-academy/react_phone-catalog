import './cartPage.scss';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AllProductsType } from '../../types/AllProductsType';
import { AddAndFavoritesContext } from '../contexts/AddAndFavoritesContext';

export const CartPage = () => {
  const context = useContext(AddAndFavoritesContext);
  const { cart } = context;

  const [products, setProducts] = useState<AllProductsType[]>([]);
  const [allProducts, setAllProducts] = useState<AllProductsType[]>([]);

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => res.json())
      .then((data: AllProductsType[]) => setAllProducts(data));
  }, []);

  useEffect(() => {
    const productsInCart = allProducts.filter(product =>
      cart.includes(product.id),
    );
    setProducts(productsInCart);
  }, [cart, allProducts]);

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

        return (
          <div className="carts-card" key={product.id}>
            <div className="info-row">
              <div className="delete">
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
                <div className="minus calc-button">
                  <img src="./img/icons/Minus.svg" alt="minus" />
                </div>

                <div className='count'></div>

                <div className="plus calc-button">
                <img src="./img/icons/Plus.svg" alt="plus" />
                </div>
              </div>
            {/* </div> */}

            {/* <div className='price'>
              ${price}
            </div> */}
            <h3 className='price'>
              ${price}
            </h3>
          </div>
        );
      })}
    </div>
  );
};
