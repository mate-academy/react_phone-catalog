import { Breadcrumbs } from '../components/Breadcrumbs/breadcrumbs';
import { PhonesTitle } from '../components/PhonesTitle/phones-title';
import { Product } from '../components/Product/product';


export const ProductPage = () => {
  return (
    <>
      <Breadcrumbs />
      <PhonesTitle />
      <Product />
    </>
  );
}