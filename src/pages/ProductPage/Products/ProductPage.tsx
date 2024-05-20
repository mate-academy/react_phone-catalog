import { useEffect, useState } from 'react';
import { ProductsList } from '../ProductsList';
import { Product } from '../../../types/ProductCard';
import { Pagination } from '../Pagination';
import { getProducts } from '../../../helpers/getProducts';
import { getPageTitle } from '../../../helpers/getPageTitle';
import { Sort } from '../../../types/Sort';
import { Filter, Pages } from '../Filter/Filter';
import { ProductCategories } from '../../../types/ProductCategories';
import './ProductPage.scss';
import { useSearchParams } from 'react-router-dom';
import { FilterOption } from '../../../types/FilterOption';

type Props = {
  category: ProductCategories;
};

export const ProductPage: React.FC<Props> = ({ category }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const [displayedProducts, setDisplayedProducts] =
    useState<Product[]>(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesTotal, setPagesTotal] = useState(1);

  // - Save pagination params in the URL `?page=2&perPage=8` (`page=1` and `perPage=all` are the default values and should not be added to the URL;
  //  - Hide pagination elements if they do not make sense;

  // Filter states
  const [sort, setSort] = useState<Sort>(Sort.Newest);
  const [itemsOnPage, setItemsOnPage] = useState<Pages>(Pages.all);
  const [searchParams, setSearchParams] = useSearchParams();

  // useEffect(() => {
  //   searchParams.set(FilterOption.Sort, Sort.Newest);
  //   searchParams.set('page', '1');
  //   searchParams.set(FilterOption.Items, Pages.all);
  //   setSearchParams(searchParams);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    // If there is sort in the params
    if (searchParams.has(FilterOption.Sort)) {
      // Set sort state in the component
      setSort(searchParams.get(FilterOption.Sort) as Sort);

      if (searchParams.get(FilterOption.Sort) === Sort.Newest) {
        searchParams.delete(FilterOption.Sort);
        setSearchParams(searchParams);
      }
    } else {
      setSort(Sort.Newest);
    }

    if (searchParams.has(FilterOption.Items)) {
      setItemsOnPage(searchParams.get(FilterOption.Items) as Pages);

      if (searchParams.get(FilterOption.Items) === Pages.all) {
        searchParams.delete(FilterOption.Items);
        setSearchParams(searchParams);
      }
    } else {
      setItemsOnPage(Pages.all);
    }

    const page = searchParams.get('page');

    if (page) {
      setCurrentPage(+page);

      if (+page === 1) {
        searchParams.delete('page');
        setSearchParams(searchParams);
      }
    } else {
      setCurrentPage(1);
    }

    // if (searchParams.has('perPage')) {
    //   set();
    // } else {
    //   set();
    // }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    let currentProducts = products;

    if (itemsOnPage !== Pages.all) {
      // Choose currently displayed products
      currentProducts = products.slice(
        (currentPage - 1) * itemsOnPage + 1,
        currentPage * itemsOnPage + 1,
      );
    }

    setDisplayedProducts(currentProducts);
  }, [currentPage, itemsOnPage, products]);

  useEffect(() => {
    if (itemsOnPage === Pages.all) {
      setPagesTotal(1);
    } else {
      setPagesTotal(Math.ceil(products.length / itemsOnPage));
    }
  }, [itemsOnPage, products.length]);

  const pageTitle = getPageTitle(category);

  useEffect(() => {
    getProducts(category).then((productsFromApi: Product[]) => {
      {
        setProducts(
          productsFromApi.sort((a: Product, b: Product) => b.year - a.year),
        );
      }
    });
  }, [category]);

  useEffect(() => {
    if (sort) {
      setProducts((currentProducts: Product[]) => {
        const sortedProducts = [...currentProducts];

        // Sort according to the method
        switch (sort) {
          case Sort.Alphabetically:
            sortedProducts.sort((a: Product, b: Product) =>
              a.name.localeCompare(b.name),
            );
            break;
          case Sort.Cheapest:
            sortedProducts.sort(
              (a: Product, b: Product) => a.fullPrice - b.fullPrice,
            );
            break;
          case Sort.Newest:
            sortedProducts.sort((a: Product, b: Product) => b.year - a.year);
            break;
        }

        return sortedProducts;
      });
    }
  }, [sort]);

  if (displayedProducts.length === 0) {
    return <h1>There are no {category} yet</h1>;
  }

  return (
    <main className="product-page">
      <section className="product-page__top">
        <nav className="product-page-nav">
          <img
            className="product-page-nav__home"
            src="./icons/home.svg"
            alt="home icon"
          />
          <img
            className="product-page-nav__next"
            src="./icons/arrow-right-disabled.svg"
            alt="right arrow image"
          />
          <p className="product-page-nav__category">{category}</p>
        </nav>
        <div className="product-page__main-info">
          <h1 className="product-page__title">{pageTitle}</h1>
          <p className="product-page__models-count">95 models</p>
        </div>
        <div className="filters product-page__filters">
          <div className="filters__item">
            <Filter
              option={FilterOption.Sort}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              title="Sort by"
            />
          </div>
          <div className="filters__item">
            <Filter
              option={FilterOption.Items}
              title="Items on page"
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </div>
        </div>
      </section>

      <section className="product-page__products-wrapper">
        <ProductsList products={displayedProducts} />
      </section>

      <Pagination
        // currentPage={currentPage}
        // setCurrentPage={setCurrentPage}
        pagesTotal={pagesTotal}
      />
    </main>
  );
};
