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

type Props = {
  category: ProductCategories;
};

export const ProductPage: React.FC<Props> = ({ category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState<Sort>(Sort.Newest);
  const [itemsOnPage, setItemsOnPage] = useState<Pages>(Pages.all);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] =
    useState<Product[]>(products);

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

  // Depending on the URL, get and set in state proper products

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
            <Filter title="Sort by" sort={sort} setSort={setSort} />
          </div>
          <div className="filters__item">
            <Filter
              title="Items on page"
              itemsOnPage={itemsOnPage}
              setItemsOnPage={setItemsOnPage}
            />
          </div>
        </div>
      </section>

      <section className="product-page__products-wrapper">
        <ProductsList products={displayedProducts} />
      </section>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={2}
      />

      {itemsOnPage}
    </main>
  );
};
