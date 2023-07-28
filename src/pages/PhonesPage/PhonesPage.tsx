import { useState } from 'react';
import { MainNavigation } from '../../components/MainNavigation/MainNavigation';
import { PhoneCard } from '../../components/PhoneCard/PhoneCard';
import { Bottom } from '../../components/PhonesPageBottom/Bottom';
import { Selection } from '../../components/Selection/Selection';
import { Phone } from '../../types/Phone';
import { CartItem } from '../../types/CartItem';
import './PhonesPage.scss';
import { NoResults } from '../NoResultsPage/NoResults';

type Props = {
  phones: Phone[],
  setPhones: React.Dispatch<React.SetStateAction<Phone[]>>,
  setLikedProducts: React.Dispatch<React.SetStateAction<Phone[]>>,
  likedProducts: Phone[],
  cartProducts: CartItem[],
  setCartProducts: React.Dispatch<React.SetStateAction<CartItem[]>>,
};

const getSortedPhones = (
  phones: Phone[],
  sortOption: string,
  currentPage: number,
  itemsPerPage: string,
) => {
  let visiblePhones = [...phones];

  visiblePhones.sort((a: Phone, b: Phone) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    }

    if (sortOption === 'price') {
      return a.price - b.price;
    }

    if (sortOption === 'age') {
      return b.price - a.price;
    }

    return 0;
  });

  if (itemsPerPage !== 'all') {
    const startIndex = (currentPage - 1) * Number(itemsPerPage);
    const endIndex = startIndex + Number(itemsPerPage);

    visiblePhones = visiblePhones.slice(startIndex, endIndex);
  }

  return visiblePhones;
};

export const PhonesPage: React.FC<Props> = ({
  phones,
  setPhones,
  likedProducts,
  setLikedProducts,
  cartProducts,
  setCartProducts,
}) => {
  const [itemsPerPage, setItemsPerPage] = useState('all');
  const [sortOption, setSortOption] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);

  const visiblePhones = getSortedPhones(
    phones, sortOption, currentPage, itemsPerPage,
  );

  // const noResult = searchResults.length === 0;

  return (
    <>
      <div className="phones-page">
        {!phones.length ? <NoResults />
          : (
            <>
              <MainNavigation />

              <div className="phones-page__content">
                <h1 className="phones-page__title">
                  Mobile phones
                </h1>

                <p className="phones-page__subtitle">
                  {`${phones.length} models`}
                </p>

                <Selection
                  phones={visiblePhones}
                  itemsPerPage={itemsPerPage}
                  setItemsPerPage={setItemsPerPage}
                  setPhones={setPhones}
                  sortOption={sortOption}
                  setSortOption={setSortOption}
                />

                <div className="phones-page__list">
                  {visiblePhones.map(phone => {
                    return (
                      <div className="phones-page__list--item" key={phone.id}>
                        <PhoneCard
                          phone={phone}
                          likedProducts={likedProducts}
                          setLikedProducts={setLikedProducts}
                          cartProducts={cartProducts}
                          setCartProducts={setCartProducts}
                        />
                      </div>
                    );
                  })}
                </div>

                {itemsPerPage !== 'all' && (
                  <Bottom
                    phones={phones}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                  />
                )}
              </div>
            </>
          )}
      </div>
    </>
  );
};
