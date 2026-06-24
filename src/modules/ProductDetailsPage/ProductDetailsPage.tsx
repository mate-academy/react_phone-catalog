import { FC, Fragment, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import cn from 'clsx';
import { useGetProductsQuery } from '../ProductsPage/services/productsApi';
import { useGetProductsByCategoryQuery } from './services/productDetailsApi';
import { selectAllProducts } from '../ProductsPage/selectors/productsSelectors';
import { selectProductDetailsById } from './selectors/productDetailsSelectors';
import { useCart } from '../shared/hooks/useCart';
import { useFavourites } from '../shared/hooks/useFavourites';
import { useRandomProducts } from './hooks/useRandomProducts';
import { formatCell } from './utilities/formatCell';
import { formatMemory } from '../shared/utilities/formatMemory';
import { formatScreen } from '../shared/utilities/formatScreen';
import { Button } from '../shared/components/ui/Button/Button';
import { NoResults } from '../shared/components/NoResults';
import { ErrorMessage } from '../shared/components/ErrorMessage';
import { BackButton } from '../shared/components/ui/Button/BackButton';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { PhotosSlider } from './components/PhotosSlider';
import { ColorSelector } from './components/ColorSelector';
import { ProductsSlider } from '../shared/components/Slider/ProductsSlider';
import { CapacitySelector } from './components/CapacitySelector';
import { ProductDetailsSkeleton } from '../shared/components/ui/Loader/ProductDetailsSkeleton';
import Favourites from '/src/images/icons/favourites.svg?react';
import FavouritesFilled from '/src/images/icons/favourites-filled.svg?react';
import type { RootState } from '../../store';
import { Category, Product, ProductDetails } from '../../types';
import { useTranslations } from 'use-intl';

interface Props {
  product: Product;
  products: Product[];
  productDetails: ProductDetails;
}

const ProductDetailsContent: FC<Props> = ({
  product,
  products,
  productDetails,
}) => {
  const { isInCart, handleAddToCart } = useCart(product);
  const { isInFavourites, handleToggleFavourite } = useFavourites(product);
  const t = useTranslations('productDetails');
  const tNav = useTranslations('nav');

  const {
    id,
    name,
    namespaceId,
    description,
    category,
    color,
    colorsAvailable,
    capacityAvailable,
    priceDiscount,
    priceRegular,
    screen,
    resolution,
    processor,
    ram,
    capacity,
    cell,
    images,
  } = productDetails;

  const randomProducts = useRandomProducts(products, id, namespaceId);

  return (
    <div className="pb-14 sm:pb-16 xl:pb-20">
      <Breadcrumbs
        routes={[
          {
            path: '/productasd',
            breadcrumb: tNav(category.toLowerCase()),
            linkTo: `/${category}`,
          },
          { path: '/productasd/:itemId', breadcrumb: name },
        ]}
        className="mt-6"
      />

      <BackButton className="mt-10" />

      {/* Title */}
      <h1 className="text-h1 text-primary dark:text-d-white mt-4">{name}</h1>

      <div className="sm:pageGrid mt-8 sm:mt-10">
        {/* Image */}
        <PhotosSlider
          images={images}
          className="sm:col-span-7 xl:col-span-12"
        />

        <div className="mt-10 sm:col-span-5 sm:col-start-8 sm:mt-0 xl:col-span-7 xl:col-start-14">
          <ColorSelector
            namespaceId={namespaceId}
            capacity={capacity}
            colorsAvailable={colorsAvailable}
          />

          <CapacitySelector
            namespaceId={namespaceId}
            capacityAvailable={capacityAvailable}
            color={color}
          />

          <div className="mt-8 flex items-center gap-2">
            <h2 className="text-primary dark:text-d-white text-[32px] leading-10.25 font-bold tracking-[-0.01em]">
              ${priceDiscount}
            </h2>

            <span className="text-secondary dark:text-d-secondary text-[22px] leading-none font-medium tracking-normal line-through">
              ${priceRegular}
            </span>
          </div>

          <div className="mt-4 flex gap-2">
            <Button
              onClick={handleAddToCart}
              className={cn(
                'text-buttons flex h-12 w-full flex-[1_1_auto] items-center justify-center transition',
                isInCart
                  ? 'text-green dark:text-d-white shadow-elements dark:bg-d-surface2 dark:hover:bg-d-icons hover:shadow-primary bg-white shadow-inner dark:shadow-none'
                  : 'bg-primary dark:bg-d-accent hover:shadow-hover-bs dark:hover:bg-d-hover-bs dark:text-d-white text-white hover:shadow-[0_3px_13px_0]',
              )}
            >
              {isInCart ? t('addedToCart') : t('addToCart')}
            </Button>

            <Button
              onClick={handleToggleFavourite}
              className={cn(
                'hover:shadow-primary flex aspect-square size-12 flex-[0_0_auto] items-center justify-center p-4 shadow-inner transition',
                isInFavourites
                  ? 'shadow-elements dark:shadow-d-elements dark:hover:shadow-d-icons'
                  : 'shadow-icons dark:bg-d-surface2 dark:hover:bg-d-icons dark:shadow-none',
              )}
            >
              {isInFavourites ? (
                <FavouritesFilled className="fill-red dark:fill-d-red" />
              ) : (
                <Favourites className="fill-primary dark:fill-d-white" />
              )}
            </Button>
          </div>

          <table className="mt-8 block">
            <tbody className="flex flex-col gap-2">
              {[
                { title: t('specs.screen'), text: formatScreen(screen) },
                { title: t('specs.resolution'), text: resolution },
                { title: t('specs.processor'), text: processor },
                { title: t('specs.ram'), text: formatMemory(ram) },
              ].map(({ title, text }) => (
                <tr key={title} className="flex justify-between">
                  <td className="text-body text-secondary dark:text-d-secondary">
                    {title}
                  </td>
                  <td className="text-body text-primary dark:text-d-white">
                    {text}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="mt-14 sm:col-span-12 sm:mt-16 xl:mt-20">
          <h3 className="text-h3 text-primary dark:text-d-white shadow-bottom shadow-elements dark:shadow-d-elements pb-4">
            {t('about')}
          </h3>

          {description.map(({ title, text }) => (
            <Fragment key={title}>
              <h4 className="text-h4 text-primary dark:text-d-white mt-8">
                {title}
              </h4>
              {text.map((p, i) => (
                <p
                  key={i}
                  className="text-body text-secondary dark:text-d-secondary mt-4"
                >
                  {p}
                </p>
              ))}
            </Fragment>
          ))}
        </section>

        <section className="mt-14 sm:col-span-12 sm:mt-16 xl:col-span-11 xl:col-start-14 xl:mt-20">
          <h3 className="text-h3 text-primary dark:text-d-white shadow-bottom shadow-elements dark:shadow-d-elements pb-4">
            {t('techSpecs')}
          </h3>

          <div className="shadow-bottom shadow-elements mt-4 w-full content-['']"></div>

          <table className="mt-6 block">
            <tbody className="flex flex-col gap-2">
              {(() => {
                const specs = [
                  { title: t('specs.screen'), text: formatScreen(screen) },
                  { title: t('specs.resolution'), text: resolution },
                  { title: t('specs.processor'), text: processor },
                  { title: t('specs.ram'), text: formatMemory(ram) },
                  {
                    title: t('specs.builtInMemory'),
                    text: formatMemory(capacity),
                  },
                ];

                if (
                  category === Category.Phones ||
                  category === Category.Tablets
                ) {
                  specs.push({
                    title: t('specs.camera'),
                    text: productDetails.camera,
                  });
                  specs.push({
                    title: t('specs.zoom'),
                    text: productDetails.zoom,
                  });
                }

                specs.push({ title: t('specs.cell'), text: formatCell(cell) });

                return specs.map(({ title, text }) => (
                  <tr key={title} className="flex justify-between">
                    <td className="text-body text-secondary dark:text-d-secondary">
                      {title}
                    </td>
                    <td className="text-body text-primary dark:text-d-white">
                      {text}
                    </td>
                  </tr>
                ));
              })()}
            </tbody>
          </table>
        </section>
      </div>

      <ProductsSlider
        title={t('youMayAlsoLike')}
        products={randomProducts}
        className="mt-14 sm:mt-16 xl:mt-20"
      />
    </div>
  );
};

export const ProductDetailsPage: FC = () => {
  const { itemId } = useParams();
  const t = useTranslations('productDetails');
  const {
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    refetch: refetchProducts,
  } = useGetProductsQuery();
  const allProducts = useSelector(selectAllProducts);

  const product = useMemo(
    () => allProducts.find(p => p.itemId === itemId),
    [allProducts, itemId],
  );

  const productCategory = product?.category;

  const {
    isLoading: isLoadingProductDetails,
    isError: isErrorDetails,
    refetch: refetchDetails,
  } = useGetProductsByCategoryQuery(productCategory!, {
    skip: !productCategory,
  });

  const isLoading = isLoadingProducts || isLoadingProductDetails;
  const isError = isErrorProducts || isErrorDetails;

  const productDetails = useSelector((state: RootState) =>
    productCategory && itemId
      ? selectProductDetailsById(state, productCategory, itemId)
      : null,
  );

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (isError) {
    return (
      <ErrorMessage
        onRetry={() => {
          refetchProducts();
          if (productCategory) {
            refetchDetails();
          }
        }}
      />
    );
  }

  if (!itemId || !product || !productDetails) {
    return <NoResults text={t('notFound')} />;
  }

  return (
    <ProductDetailsContent
      product={product}
      products={allProducts}
      productDetails={productDetails}
    />
  );
};
