import { useEffect, useState } from 'react';
import { ProductDetails, UpdatedProduct } from '../../Types/types';
import { getAllProducts } from '../../../../api/getProducts';
import { AnimatedLayout } from '../AnimatedComponents/AnimatedLayout';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { getDetails } from '../../../../app/features/productDetailsSlice';
import { ProductDescription } from './ProductDescription';
// eslint-disable-next-line max-len
import { ProductSliderSkeleton } from '../ProductCardSkeleton/ProductSliderSkeleton';
import { getRandomProducts } from '../../../../utils/getRandomProducts';
import { ProductSlider } from '../ProductSlider/ProductSlider';
import { ProductDescriptionSkeleton } from './ProductDescriptionSkeleton';
import { GoBackButton } from '../ActionButtons/GoBackButton';
import { scrollToTop } from '../../../../utils/scrollToTop';

export const ProductDetailsPage = () => {
  const title = 'You may also like';
  const [productList, setProductList] = useState<UpdatedProduct[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);

  const { details, isLoading } = useAppSelector(
    state => state.productDetailsReducer,
  );
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const normalizedPathname = pathname.slice(1).split('/')[0];
  let normalizedName = '';

  if (pathname.slice(1).split('/').length > 1) {
    normalizedName = pathname.slice(1).split('/')[1].replaceAll('-', ' ');
  }

  const listOfRandomProducts = getRandomProducts(productList, 10);

  const productDetails: ProductDetails | undefined = details.find(
    item => item.id === pathname.slice(1).split('/')[1],
  );

  const productItem = productList.find(card => {
    return card.itemId === productDetails?.id;
  });

  useEffect(() => {
    scrollToTop();

    dispatch(getDetails(normalizedPathname));

    getAllProducts()
      .then(setProductList)
      .finally(() => {
        setIsLoadingList(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatedLayout>
      <div className="container details">
        <div className="details__top">
          <div className="breadcrumb">
            <Link to="/" className="breadcrumb__link breadcrumb__link--home" />

            <div className="breadcrumb__arrow" />

            <Link
              to={'..'}
              className="breadcrumb__link breadcrumb__link--active"
            >
              {normalizedPathname}
            </Link>

            <div className="breadcrumb__arrow" />

            <p className="breadcrumb__link">{normalizedName}</p>
          </div>

          <GoBackButton />

          <h1 className="title title--h1 title--capitalized">
            {normalizedName}
          </h1>
        </div>

        {!isLoading ? (
          <ProductDescription
            details={productDetails}
            item={productItem as UpdatedProduct}
          />
        ) : (
          <ProductDescriptionSkeleton />
        )}

        {!isLoadingList ? (
          <ProductSlider
            componentTitle={title}
            productList={listOfRandomProducts}
          />
        ) : (
          <ProductSliderSkeleton componentTitle={title} />
        )}
      </div>
    </AnimatedLayout>
  );
};
