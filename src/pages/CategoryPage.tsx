import { useContext, useState } from 'react';
import ProductCard from '../components/ui/ProductCard';
import { ProductContext } from '../context/ProductContext';

import Pagination from '../components/ui/Pagination';
import { useParams } from 'react-router-dom';

const CategoryPage: React.FC = () => {
  const { products } = useContext(ProductContext);
  const [sort, setSort] = useState('newest');
  const [itemsPerPage, setItemsPerPage] = useState<string>('16');
  const [currentPage, setCurrentPage] = useState(1);

  const { category: definer } = useParams<{ category: string }>();

  const pageTitle =
    definer === 'phones'
      ? 'Mobile Phones'
      : definer === 'tablets'
        ? 'Tablets'
        : 'Accessories';

  const filteredProductsByCategory = products.filter(
    product => product.category === definer,
  );

  const sortedProducts = (() => {
    const preSortedProducts = [...filteredProductsByCategory];

    switch (sort) {
      case 'newest':
        preSortedProducts.sort((a, b) => b.year - a.year);
        break;
      case 'alphabetically':
        preSortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'cheapest':
        preSortedProducts.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }

    return preSortedProducts;
  })();

  const perPage =
    itemsPerPage === 'all' ? sortedProducts.length : Number(itemsPerPage);

  const totalPages = Math.ceil(sortedProducts.length / perPage);
  const lastItem = currentPage * perPage;
  const firstItem = lastItem - perPage;
  const currentItems = sortedProducts.slice(firstItem, lastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1);
  };

  return (
    <main className="flex flex-col px-4 sm:px-6 md:px-8 w-full gap-10 h-full">
      <div>{/* url trail */}</div>
      <div className="flex flex-col gap-2">
        <h1 className="text-5xl font-bold">{pageTitle}</h1>
        <p className="text-sm text-gray-400">{`${sortedProducts.length} models`}</p>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-gray-400 text-xs">Sort by</p>
            <select
              className="w-44 text-sm cursor-pointer transition-colors
               bg-white text-black
               hover:bg-slate-400 hover:text-white
               focus:bg-slate-400 focus:outline-none h-10"
              name="sort"
              id="sort"
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="alphabetically">Alphabetically</option>
              <option value="cheapest">Cheapest</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-gray-400 text-xs">Items per page</p>
            <select
              className="w-32 h-10 text-sm cursor-pointer transition-colors
               bg-white text-black
               hover:bg-slate-400 hover:text-white
               focus:bg-slate-400 focus:outline-none"
              name="quantity"
              id="quantity"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="all">All</option>
            </select>
          </div>
        </div>
        <section className="flex flex-wrap gap-4">
          {currentItems.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
};

export default CategoryPage;
