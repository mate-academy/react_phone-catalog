import { useProducts } from '../../context/useProducts';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { Loader } from '../../components/Loader';
import { ErrorMessage } from '../../components/ErrorMessage';
import { useProcessedProducts } from '../../hooks/useProcessedProducts';

export const HomePage = () => {
  const { products, isLoading, error } = useProducts();

  const newProducts = useProcessedProducts(products, { sort: 'year' });
  const hotPriceProducts = useProcessedProducts(products, { sort: 'hot' });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <PicturesSlider />

      <ProductsSlider
        products={newProducts.slice(0, 20)}
        hasDiscount={false}
        heading={'Brand new models'}
      />

      <ShopByCategory />

      <ProductsSlider
        products={hotPriceProducts.slice(0, 20)}
        hasDiscount={true}
        heading={'Hot prices'}
      />
    </>
  );
};
