import { useParams } from 'react-router-dom';
import { BackLink } from '../../modules/BackLink';
import { BreadCrumbs } from '../../modules/BreadCrumbs/BreadCrumbs';
import { Container } from '../../modules/Container';
// import { ProductSlider } from '../../modules/ProductSlider/ProductSlider';

import { useGetTabletsQuery } from '../../store/api/extendedApi/tablet';
import { Gadget } from '../../utils/types/Gadget';
import { ProductDetails } from '../../modules/ProductDetails';
import { useGetDataQuery } from '../../store/api/api';
import { getSuggestedProducts } from '../../helpers/helpers';
import { ProductsSlider } from '../../modules/ProductsSlider';
import { Category } from '../../utils/types/Categories';
// eslint-disable-next-line max-len
import { useGetAccessoriesQuery } from '../../store/api/extendedApi/accessorize';
import { useGetPhonesQuery } from '../../store/api/extendedApi/phone';
import { Accessorize } from '../../utils/types/Accessorize';
import { Product as ProductItem } from '../../utils/types/Product';
import styles from './Product.module.scss';
import { Loader } from '../../modules/Loader';
import notFound from './../../images/placeholders/product-not-found.png';

export const Product = () => {
  const { productId, category } = useParams();

  const { data: tabletsData, isLoading: tabletsLoading } = useGetTabletsQuery();

  const { data: productsData, isLoading: productsLoading } = useGetDataQuery();

  const { data: accessoriesData, isLoading: accessoriesLoading } =
    useGetAccessoriesQuery();

  const { data: phonesData, isLoading: phonesLoading } = useGetPhonesQuery();

  const detectCategory = (type: Category) => {
    switch (type) {
      case Category.Accessories:
        return accessoriesData;
      case Category.Phones:
        return phonesData;
      case Category.Tablets:
        return tabletsData;
      default:
        return [];
    }
  };

  const currentCategory: Accessorize[] | Gadget[] | undefined = detectCategory(
    category as Category,
  );

  const currentGadget: Gadget | undefined = currentCategory?.find(
    gadget => productId === gadget.id,
  );

  const product: ProductItem | undefined = productsData?.find(
    gadget => gadget.itemId === productId,
  );

  const suggestedProducts = getSuggestedProducts(productsData || [], 12);
  const loadingData =
    tabletsLoading && productsLoading && accessoriesLoading && phonesLoading;

  return (
    <>
      <Container>
        {product?.name && <BreadCrumbs title={product?.name} />}
        <div className={styles.backLink}>
          <BackLink />
        </div>
      </Container>
      {loadingData && <Loader />}
      {!loadingData && currentGadget && product && (
        <ProductDetails currentGadget={currentGadget} product={product} />
      )}
      {!loadingData && !currentGadget && !product && (
        <Container>
          <h2>Sorry, the product was not found</h2>
          <div className={styles.notFoundProduct}>
            <img src={notFound} alt="Not found image" />
          </div>
        </Container>
      )}

      <ProductsSlider
        products={suggestedProducts}
        isDiscount={true}
        title="You may also like"
      />
    </>
  );
};
