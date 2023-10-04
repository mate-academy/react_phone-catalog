import { BreadCrumbs } from '../componets/breadcrumbs/BreadCrumbs';
import { ProductDetails } from '../componets/productDetails/ProductDetails';
import { ReferenceBack } from '../componets/referenceBack/RefereneBack';
import { RandomPhones } from '../componets/randomPhones/RandomPhones';

export const ProductDetailsPage = () => {
  return (
    <div className="page__container">
      <BreadCrumbs title="Phones" link="/phones" />
      <ReferenceBack />
      <ProductDetails />
      <RandomPhones />
    </div>
  );
};
