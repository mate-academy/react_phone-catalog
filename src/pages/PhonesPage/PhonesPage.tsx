import { useState } from 'react';
import './PhonesPage.scss';
import { useProducts } from '../../context';
import { ProductCard } from '../../components/ProductCard';
import { Dropdown } from '../../bits';
import { BackButton, BreadCrumbs, Pagination } from '../../components';
import { SortByType } from '../../types/enums/SortByType';

const sortOptions = [
  SortByType.alphabetically,
  SortByType.newest,
  SortByType.cheapest,
];

const itemsOptions = ['all', '4', '8', '16'];

export const PhonesPage = () => {
  const { filteredProducts, setSortBy } = useProducts();
  const [itemsToShow, setItemsToShow] = useState<string>(SortByType.all);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPhone = currentPage * Number(itemsToShow);
  const indexOfFirstPhone = indexOfLastPhone - Number(itemsToShow);

  let currentPhones;

  if (itemsToShow === SortByType.all) {
    currentPhones = filteredProducts;
  } else {
    currentPhones = filteredProducts.slice(indexOfFirstPhone, indexOfLastPhone);
  }

  const phonesQuantity = filteredProducts.length;

  const handleSortBy = (option: string) => {
    setSortBy(option);
  };

  const handleItemToShow = (item: string) => {
    setItemsToShow(item);
  };

  return (
    <div className="phones">
      <div className="phones__path-container">
        <BreadCrumbs />
      </div>

      <div className="phones__back-button-container">
        <BackButton />
      </div>

      <div className="phones__heading">
        <h1 className="phones__title">Mobile Phones</h1>
        <p className="phones__quantity">{`${phonesQuantity} items`}</p>
      </div>

      <div className="phones__selects-container">
        <Dropdown
          setSelection={handleSortBy}
          title="Sort by"
          options={sortOptions}
        />

        <Dropdown
          title="Items on page"
          options={itemsOptions}
          setSelection={handleItemToShow}
        />
      </div>

      <div
        className="phones__list"
        data-cy="productList"
      >
        {currentPhones.map(phone => (
          <ProductCard
            key={phone.id}
            product={phone}
          />
        ))}
      </div>

      {itemsToShow !== SortByType.all && (
        <div className="phones__pagination-container">
          <Pagination
            phonesPerPage={itemsToShow !== SortByType.all
              ? Number(itemsToShow) : 0}
            totalPhones={filteredProducts.length}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
};
