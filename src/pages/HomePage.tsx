import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  getAmountOfProducts,
  getDiscountProducts,
  getNewProducts,
} from '../api/products';
import { getBanner } from '../api/banner';
import { Banner } from '../components/Banner';
import { Loader } from '../components/Loader';
import { CategoriesProduct } from '../components/CategoriesProduct';
import { ListOfProductCards } from '../components/ListOfProductCards';
import categoryPhones from '../images/banner-img/category-phones.png';
import categoryTablets from '../images/banner-img/category-tablets.png';
import categoryAccessories from '../images/banner-img/category-accessories.png';

const categories = [
  {
    id: 1,
    description: 'Mobile phones',
    image: categoryPhones,
    imageAlt: 'Category Phones',
    link: 'phones',
  },
  {
    id: 2,
    description: 'Tablets',
    image: categoryTablets,
    imageAlt: 'Category Tablets',
    link: 'tablets',
  },
  {
    id: 3,
    description: 'Accessories',
    image: categoryAccessories,
    imageAlt: 'Category Accessories',
    link: 'accessories',
  },
];

export const HomePage = () => {
  const {
    isLoading: isNewProducts,
    fetchNextPage: fetchNextPageNewProducts,
    data: newProducts,
  } = useInfiniteQuery({
    queryKey: ['newProducts'],
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) => getNewProducts(pageParam, 20),
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.length) {
        return undefined;
      }

      return pages.length;
    },
  });

  const {
    isLoading: isDiscountProducts,
    fetchNextPage: fetchNextPageDiscountProducts,
    data: discountProducts,
  } = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ['discountProducts'],
    queryFn: ({ pageParam = 0 }) => getDiscountProducts(pageParam, 20),
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.length) {
        return undefined;
      }

      return pages.length;
    },
  });

  const { isLoading: isAmountOfProducts, data: amountOfProducts } = useQuery({
    queryKey: ['amountOfProducts'],
    queryFn: getAmountOfProducts,
  });

  const { isLoading: isBanner, data: bannerList } = useQuery({
    queryKey: ['bannerList'],
    queryFn: getBanner,
  });

  const valuesAmountOfProducts =
    amountOfProducts && Object.values(amountOfProducts);

  const updatedCategories = categories.map((category, index) => ({
    ...category,
    amount: valuesAmountOfProducts && valuesAmountOfProducts[index],
  }));

  return (
    <main
      className="
        flex w-full flex-col gap-14
        overflow-hidden pb-14 pt-6 md:gap-16
        md:pb-16 md:pt-8 lg:gap-20 lg:pb-20 lg:pt-14
      "
    >
      <h1 className="content">Welcome to Nice Gadgets store!</h1>

      {isBanner ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <section
          className="
              md:content flex flex-col gap-6 md:gap-8 lg:gap-14
            "
        >
          <Banner images={bannerList} />
        </section>
      )}

      {isNewProducts ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        newProducts && (
          <ListOfProductCards
            swiperProps={{ onReachEnd: () => fetchNextPageNewProducts() }}
            className="content"
            discount={false}
            products={newProducts.pages.flat()}
            title="Brand new models"
          />
        )
      )}

      {isAmountOfProducts ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <CategoriesProduct
          categories={updatedCategories}
          title="Shop by category"
        />
      )}

      {isDiscountProducts ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        discountProducts && (
          <ListOfProductCards
            swiperProps={{ onReachEnd: () => fetchNextPageDiscountProducts() }}
            className="content"
            products={discountProducts.pages.flat()}
            title="Hot prices"
          />
        )
      )}
    </main>
  );
};
