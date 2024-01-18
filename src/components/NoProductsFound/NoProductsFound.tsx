/* eslint-disable global-require */
import './NoProductsFound.scss';

const image = [
  require('../../assets/others/no-products.png'),
];

export const NoProductsFound = () => {
  return (
    <div className="no-products-found">
      <img src={image[0]} alt=" " className="no-products-found__image" />

      <div className="no-products-found__content">
        <h1 className="title">No products found</h1>
        <p className="no-products-found__message">
          {'We couldn\'t find any products matching your query'
            + '. Try another query.'}
        </p>
      </div>
    </div>
  );
};
