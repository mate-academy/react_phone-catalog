import { useState } from 'react';
import './PhonesPage.scss';
import { ItemsPerPageQuantity, ProductSortingOption } from 'types';
import { useProducts } from 'context';
import { Dropdown } from 'components/ui-kit';
import {
  BackButton,
  BreadCrumbs,
  Loader,
  Pagination,
  ProductCard,
  Wrapper,
} from 'components';
import { ProductGrid } from 'components/ProductGrid';

const sortOptions: string[] = [
  ProductSortingOption.alphabetically,
  ProductSortingOption.newest,
  ProductSortingOption.cheapest,
];

const quantityToShow: string[] = [
  ItemsPerPageQuantity.all,
  ItemsPerPageQuantity.four,
  ItemsPerPageQuantity.eigth,
  ItemsPerPageQuantity.sixteen,
];

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
    <Wrapper>
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
              <div className="phones__select">
                <Dropdown
                  setSelection={handleSortBy}
                  title="Sort by"
                  options={sortOptions}
                  initialOption={ProductSortingOption.alphabetically}
                />
              </div>

              <div className="phones__select">
                <Dropdown
                  title="Items on page"
                  options={quantityToShow}
                  setSelection={handleItemToShow}
                  initialOption={ItemsPerPageQuantity.all}
                />
              </div>
            </div>

            <div className="phones__content">
              <div
                className="phones__list"
                data-cy="productList"
              >
                <ProductGrid>
                  {currentPhones.map(phone => (
                    <ProductCard
                      key={phone.id}
                      product={phone}
                    />
                  ))}
                </ProductGrid>

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
          </div>

        )}
    </Wrapper>

  );
};
