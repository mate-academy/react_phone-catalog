import './ProductPage.scss';
import { ProductName } from '../../types/prodName';
import { useContext, useEffect, useMemo, useState } from 'react';
import { DropDown } from '../../components/Dropdown';
import { GlobalContext } from '../../context/GlobalContext';
import { SortType } from '../../types/SortType';
import { ItemsOnPage } from '../../types/ItemsOnPageType';
import { Product } from '../../types/Product';
import { ProductCard } from '../../components/ProductCard';
import { NaviLine } from '../../components/NaviLine';
import { Button } from '../../components/Button';
import { ProductsList } from '../../components/ProductsList';
import { useLocation } from 'react-router-dom';
import { ErrorBlock } from '../../components/ErrorBlock';
import classNames from 'classnames';
import { Pagination } from '../../components/Pagination';

type Props = {
  type: ProductName;
};

export const ProductPage: React.FC<Props> = ({ type }) => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.Alphabetically);
  const [itemsOnPage, setItemsOnPage] = useState<ItemsOnPage>(ItemsOnPage.all);
  const [page, setPage] = useState(1);
  const { allProducts, productsError, reloadProducts } =
    useContext(GlobalContext);

  const category = useLocation().pathname.slice(1);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => product.category === type);
  }, [type, allProducts]);

  // const productsSort = (sortBy: SortType): Product[] => {
  //   switch (sortBy) {
  //     case SortType.Newest:
  //       return filteredProducts.sort((a, b) => b.year - a.year);
  //     case SortType.Cheapest:
  //       return filteredProducts.sort((a, b) => a.price - b.price);
  //     default:
  //       return filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  //   }
  // };
  // const visibleProducts = productsSort(sortBy);

  const visibleProducts = useMemo(() => {
    const productsCopy = [...filteredProducts];

    switch (sortBy) {
      case SortType.Newest:
        return productsCopy.sort((a, b) => b.year - a.year);
      case SortType.Cheapest:
        return productsCopy.sort((a, b) => a.price - b.price);
      default:
        return productsCopy.sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [filteredProducts, sortBy]);

  useEffect(() => {
    setPage(1);
  }, [itemsOnPage, sortBy, type]);

  const itemsPerPage =
    itemsOnPage === ItemsOnPage.all
      ? visibleProducts.length
      : Number(itemsOnPage);

  const totalPages = Math.ceil(visibleProducts.length / itemsPerPage);

  const currentProducts = useMemo(() => {
    return visibleProducts.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage,
    );
  }, [visibleProducts, page, itemsPerPage]);

  return (
    <div className="product-page">
      <div className="container">
        <div className="product-page__content">
          <div className="product-page__navi-line">
            <NaviLine category={type} />
          </div>

          {!productsError ? (
            <>
              <h1 className="product-page__title">
                {type === 'phones'
                  ? `Mobile ${type}`
                  : type[0].toUpperCase() + type.slice(1)}
              </h1>
              <span className="product-page__desc">{`${filteredProducts.length} models`}</span>

              <div className="product-page__drop-block">
                <DropDown<SortType>
                  options={Object.values(SortType)}
                  label="Sort by"
                  selected={sortBy}
                  onSelect={setSortBy}
                />
                <DropDown<ItemsOnPage>
                  options={Object.values(ItemsOnPage)}
                  label="Items on page"
                  selected={itemsOnPage}
                  onSelect={setItemsOnPage}
                />
              </div>

              <ProductsList products={currentProducts} />

              <div className="product-page__pagination">
                {itemsOnPage !== ItemsOnPage.all && totalPages > 1 && (
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    onChange={setPage}
                  />
                )}
              </div>
            </>
          ) : (
            <ErrorBlock message={productsError} onReload={reloadProducts} />
          )}
        </div>
      </div>
    </div>
  );
};
