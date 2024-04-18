import { Banner } from '../components/Banner';
import { ListOfProductCards } from '../components/ListOfProductCards';
import {
  getAmountOfProducts,
  getDiscountProducts,
  getNewProducts,
} from '../api/products';
import { Loader } from '../components/Loader';
import { useQuery } from '@tanstack/react-query';
import { CategoriesProduct } from '../components/CategoriesProduct';
import categoryAccessories from '../images/banner-img/category-accessories.png';
import categoryPhones from '../images/banner-img/category-phones.png';
import categoryTablets from '../images/banner-img/category-tablets.png';
import { getBanner } from '../api/banner';

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
  const { isLoading: isNewProducts, data: newProducts } = useQuery({
    queryKey: ['newProducts'],
    queryFn: getNewProducts,
  });

  const { isLoading: isDiscountProducts, data: discountProducts } = useQuery({
    queryKey: ['discountProducts'],
    queryFn: getDiscountProducts,
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
        flex w-full flex-col gap-14 overflow-hidden pb-20
        pt-6 md:gap-16 md:pt-8 lg:gap-20 lg:pt-14
      "
    >
      <section className="md:content flex flex-col gap-6 md:gap-8 lg:gap-14">
        <h1 className="padding-inline-sm md:px-0">
          Welcome to Nice Gadgets store!
        </h1>

        {isBanner ? <Loader /> : <Banner images={bannerList} />}
      </section>

      {isNewProducts ? (
        <Loader />
      ) : (
        newProducts && (
          <ListOfProductCards
            className="content"
            discount={false}
            products={newProducts}
            title="Brand new models"
          />
        )
      )}

      {isAmountOfProducts ? (
        <Loader />
      ) : (
        <CategoriesProduct
          categories={updatedCategories}
          title="Shop by category"
        />
      )}

      {isDiscountProducts ? (
        <Loader />
      ) : (
        discountProducts && (
          <ListOfProductCards
            className="content"
            products={discountProducts}
            title="Hot prices"
          />
        )
      )}
    </main>
  );
};
