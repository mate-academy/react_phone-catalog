// import { useContext } from 'react';
// import { ProductsContext } from '../../components/ProductsContext';

export const CartPage = () => {
  // const products = useContext(ProductsContext);

  // // eslint-disable-next-line no-console
  // console.log(products);

  return (
    <div className="cartpage">
      <div className="container">

        <div
          className="product-details-page__button-back"
          data-cy="backButton"
        >
          <img src="new/img/icons/arrow-left.svg" alt="arrow-back" />
          <span>Back</span>
        </div>

        <h1 className="title rainbow-text favoritespage__title">
          Cart
        </h1>
      </div>
    </div>
  );
};
