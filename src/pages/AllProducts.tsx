import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductsList } from '../components/ProductsList';
import { useProducts } from '../context/ProductsContext';

export const AllProductsPage = () => {
  const allProducts = useProducts();

  return (
    <div>
      <Breadcrumbs />

      <h2 className="mt-6 mb-2 tablet:mt-10">All Products</h2>

      <ProductsList products={allProducts} />
    </div>
  );
};
