import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { Context } from '../Context';
import { ProductCard } from '../ProductCard';
import { Selector } from '../Selector';
import { Pagination } from '../Pagination';
import { NoResults } from '../NoResults';
import productCategoryList from '../../api/productCategory.json';
import { useWindowSize } from '../../utils/useWindowSize';
import { capitalizeFirstLetter } from '../../utils/styleString';
import { Category } from '../../types/Category';
import { Product } from '../../types/Product';
import './ProductsList.scss';

export const ProductsList: React.FC = () => {
  const { products, favorite } = useContext(Context);

  const location = useLocation();
  const { width } = useWindowSize();
  const [searchParams] = useSearchParams();

  const [category, setCategory] = useState<Category | null>(null);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [itemsInList, setItemsInList] = useState(1);

  const currentCategoryPage = location.pathname.split('/').slice(1)[0];

  const sort = searchParams.get('sort') || '';
  const perPage = searchParams.get('perPage') || '';
  const currentPage = searchParams.get('page') || '';
  const query = searchParams.get('query') || '';

  const getCategory = () => {
    const currentCategory = productCategoryList.filter(
      item => item.type === currentCategoryPage,
    )[0];

    setCategory(currentCategory);
  };

  const getCategoryProducts = () => {
    if (!category) {
      setCategoryProducts([]);
    }

    if (category) {
      const categoryItems = products.filter(
        product => product.type === category.itemType,
      );

      setCategoryProducts(categoryItems);
    }
  };

  const getProductSortedList = (productBaseList: Product[]) => {
    let sortedProducts = (currentCategoryPage === 'favorite')
      ? [...favorite]
      : [...productBaseList];

    if (sort === 'age') {
      sortedProducts = sortedProducts.sort(
        (item1, item2) => item1.age - item2.age,
      );
    }

    if (sort === 'name') {
      sortedProducts = sortedProducts.sort(
        (item1, item2) => item1.name.localeCompare(item2.name),
      );
    }

    if (sort === 'price') {
      sortedProducts = sortedProducts.sort(
        (item1, item2) => item1.price - item2.price,
      );
    }

    if (query) {
      const queryFilter = (param?: string | null) => {
        return param
          ? param.toLowerCase().includes(query.toLowerCase())
          : null;
      };

      sortedProducts = sortedProducts.filter(
        product => queryFilter(product.name),
      );
    }

    return sortedProducts || null;
  };

  const sortedProductList = getProductSortedList(categoryProducts);

  let leftLimit = 0;
  let rightLimit = sortedProductList.length;

  if (currentPage && perPage) {
    leftLimit = +perPage * (+currentPage - 1);

    rightLimit = +perPage * +currentPage > sortedProductList.length
      ? sortedProductList.length
      : +perPage * +currentPage;
  } else {
    leftLimit = 0;
    rightLimit = sortedProductList.length;
  }

  const visibleProducts = sortedProductList.slice(leftLimit, rightLimit);

  const categoryCount = (currentCategoryPage === 'favorite')
    ? favorite.length
    : categoryProducts.length;

  const noResultTitle = useMemo(() => {
    if (currentCategoryPage === 'favorite') {
      return 'Favorites';
    }

    if (!category) {
      return 'Current item';
    }

    return capitalizeFirstLetter(category?.itemType);
  }, [category]);

  const productListSettings = {
    itemWidth: 288,
    itemsOnPage: itemsInList,
  };

  const {
    itemWidth,
    itemsOnPage,
  } = productListSettings;

  const productListWidth = () => {
    if (width > 1193) {
      setItemsInList(4);
    }

    if (width > 599 && width < 1193) {
      setItemsInList(2);
    }

    if (width < 599) {
      setItemsInList(1);
    }
  };

  useEffect(() => {
    productListWidth();
  }, [width]);

  useEffect(() => {
    getCategory();
  }, [location]);

  useEffect(() => {
    getCategoryProducts();
  }, [category]);

  return (
    <section
      className="
        page__section
        product-list
        grid__item--tablet-1-12
        grid__item--desktop-1-24"
    >
      <h1
        className="
          page__section-title
          section__title
          product-list__title"
      >
        {category?.title}
      </h1>

      <div className="product-list__count">
        {`${categoryCount} models`}
      </div>

      {currentCategoryPage !== 'favorite'
        && (
          <div
            className="
              product-list__filters
              filters"
          >
            <Selector
              type="sort-by"
            />

            <Selector
              type="items-on-page"
            />
          </div>
        )}

      <div className="product-list__products">
        {visibleProducts.length > 0
            && (
              <div
                className="product-list__products-container"
                data-cy="productList"
                style={{
                  maxWidth: `${itemsOnPage * itemWidth}px`,
                }}
              >
                {visibleProducts.map(productItem => (
                  <ProductCard
                    key={productItem.id}
                    product={productItem}
                  />
                ))}
              </div>
            )}

        {!visibleProducts.length
          && (
            <NoResults
              title={noResultTitle}
            />
          )}
      </div>

      {currentCategoryPage !== 'favorite'
        && (
          <Pagination
            length={sortedProductList.length}
          />
        )}
    </section>
  );
};
