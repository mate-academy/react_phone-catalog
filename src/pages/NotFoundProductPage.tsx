import { GoBackLink } from '../components/ui/GoBackLink';

export const NotFoundProductPage = () => {
  return (
    <div className="not-found-product">
      <div className="not-found-product__goback-link">
        <GoBackLink />
      </div>

      <div className="not-found-product__title-block">
        <h2>Product was not found</h2>
      </div>

      <div className="not-found-product__img-block"></div>
    </div>
  );
};
