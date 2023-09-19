import { useState } from 'react';
import './PhonesPage.scss';
import { ProductSortingOption } from 'types';
import { useProducts } from 'context';
import { Dropdown } from 'components/ui-kit';
import {
  BackButton,
  BreadCrumbs,
  Loader,
  Pagination,
  ProductCard,
} from 'components';

const sortOptions = [
  ProductSortingOption.alphabetically,
  ProductSortingOption.newest,
  ProductSortingOption.cheapest,
];

const itemsOptions = ['all', '4', '8', '16'];

export const PhonesPage = () => {
  const { filteredPhones, setSortBy, loading } = useProducts();
  const [itemsToShow, setItemsToShow]
    = useState<string>(ProductSortingOption.all);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPhone = currentPage * Number(itemsToShow);
  const indexOfFirstPhone = indexOfLastPhone - Number(itemsToShow);

  let currentPhones;

  if (itemsToShow === ProductSortingOption.all) {
    currentPhones = filteredPhones;
  } else {
    currentPhones = filteredPhones.slice(indexOfFirstPhone, indexOfLastPhone);
  }

  const phonesQuantity = filteredPhones.length;

  const handleSortBy = (option: string) => {
    setSortBy(option);
  };

  const handleItemToShow = (item: string) => {
    setItemsToShow(item);
  };

  return (
    <>
      {loading
        ? (
          <Loader />
        )
        : (
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

            {itemsToShow !== ProductSortingOption.all && (
              <div className="phones__pagination-container">
                <Pagination
                  phonesPerPage={itemsToShow !== ProductSortingOption.all
                    ? Number(itemsToShow) : 0}
                  totalPhones={filteredPhones.length}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </div>
            )}
          </div>
        )}
    </>

  );
};
