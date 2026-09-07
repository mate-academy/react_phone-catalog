/* eslint-disable max-len */
import { useMemo, useState, useEffect } from 'react';
import { CustomSelect } from '../shared/CustomSelect/CustomSelect';
import { ProductsCategory } from '../../views/ProductsCategory/ProductsCategory';
import { itemsPerPageOptions } from '../../utils/variables/itemsPerPageOptions';
import { Categories } from '../../utils/types/Categories';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ProductPageHeading } from '../../utils/types/ProductPageHeading';
import { sortOptions } from '../../utils/variables/sortOptions';
import { useProducts } from '../../context/products/useProducts';
/* eslint-enable max-len */

export const ProductsPage = () => {
  const { products } = useProducts();
  const location = useLocation();
  const path = location.pathname.replace('/', '');
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSort = searchParams.get('sort') || 'age';
  const initialPage = Number(searchParams.get('page') || 1);
  const initialPerPage = Number(searchParams.get('perPage') || 4);

  const [sortBy, setSortBy] = useState(initialSort);
  const [itemsPerPage, setItemsPerPage] = useState(initialPerPage);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    switch (path) {
      case 'phones':
        return products.filter(p => p.category === Categories.PHONES);
      case 'tablets':
        return products.filter(p => p.category === Categories.TABLETS);
      case 'accessories':
        return products.filter(p => p.category === Categories.ACCESSORIES);
      default:
        return [];
    }
  }, [products, path]);

  const sortedProducts = useMemo(() => {
    const copy = [...filteredProducts];

    switch (sortBy) {
      case 'price-asc':
        return copy.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return copy.sort((a, b) => b.price - a.price);
      case 'title':
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return copy.sort((a, b) => b.year - a.year);
    }
  }, [filteredProducts, sortBy]);

  const paginatedProducts = useMemo(() => {
    if (itemsPerPage >= sortedProducts.length) {
      return sortedProducts;
    }

    const start = (currentPage - 1) * itemsPerPage;

    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, currentPage, itemsPerPage]);

  const totalPages =
    itemsPerPage >= sortedProducts.length
      ? 1
      : Math.ceil(sortedProducts.length / itemsPerPage);

  useEffect(() => {
    const params: Record<string, string> = {};

    if (sortBy !== 'age') {
      params.sort = sortBy;
    }

    if (currentPage !== 1) {
      params.page = String(currentPage);
    }

    if (itemsPerPage !== sortedProducts.length && itemsPerPage !== 4) {
      params.perPage = String(itemsPerPage);
    }

    setSearchParams(params);
  }, [
    sortBy,
    currentPage,
    itemsPerPage,
    setSearchParams,
    sortedProducts.length,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [path]);

  const heading =
    ProductPageHeading[path.toUpperCase() as keyof typeof ProductPageHeading] ||
    'Products';

  const filters = (
    <>
      <CustomSelect
        label="Sort by:"
        value={sortBy}
        onChange={val => setSortBy(String(val))}
        open={openDropdown === 'sort'}
        onToggle={() =>
          setOpenDropdown(openDropdown === 'sort' ? null : 'sort')
        }
        options={sortOptions}
      />

      <CustomSelect
        label="Items per page:"
        value={itemsPerPage}
        onChange={v => {
          setItemsPerPage(Number(v));
          setCurrentPage(1);
        }}
        open={openDropdown === 'items'}
        onToggle={() =>
          setOpenDropdown(openDropdown === 'items' ? null : 'items')
        }
        options={[
          ...itemsPerPageOptions,
          { value: sortedProducts.length, label: 'All' },
        ]}
      />
    </>
  );

  return (
    <ProductsCategory
      title={heading}
      products={paginatedProducts}
      totalProducts={sortedProducts.length}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      filters={filters}
      subtitleLabel="models"
    />
  );
};
