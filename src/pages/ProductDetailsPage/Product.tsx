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
import { Category } from './../../utils/types/Categories';
// eslint-disable-next-line max-len
import { useGetAccessoriesQuery } from '../../store/api/extendedApi/accessorize';
import { useGetPhonesQuery } from '../../store/api/extendedApi/phone';
import { Accessorize } from '../../utils/types/Accessorize';
import { Product as ProductItem } from '../../utils/types/Product';
// import { useLocation } from 'react-router-dom';

export const Product = () => {
  const { productId, category } = useParams();
  const { data: tabletsData } = useGetTabletsQuery();
  const { data: productsData } = useGetDataQuery();
  const { data: accessoriesData } = useGetAccessoriesQuery();
  const { data: phonesData } = useGetPhonesQuery();

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

  return (
    <div>
      <BreadCrumbs title="Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)" />
      <section className="backLink">
        <Container>
          <BackLink />
        </Container>
      </section>
      {currentGadget && product && (
        <ProductDetails currentGadget={currentGadget} product={product} />
      )}
      <ProductsSlider
        products={suggestedProducts}
        isDiscount={true}
        title="You may also like"
      />
    </div>
  );
};
