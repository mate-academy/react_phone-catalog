import { useState } from 'react';
import { MainNavigation } from '../../components/MainNavigation/MainNavigation';
import { PhoneCard } from '../../components/PhoneCard/PhoneCard';
import { Bottom } from '../../components/PhonesPageBottom/Bottom';
import { Selection } from '../../components/Selection/Selection';
import { Phone } from '../../types/Phone';
import './PhonesPage.scss';

type Props = {
  phones: Phone[],
};

export const PhonesPage: React.FC<Props> = ({ phones }) => {
  const [sortedPhones, setSortedPhones] = useState<Phone[]>(phones);
  const [itemsPerPage, setItemsPerPage] = useState('all');
  const [sortOption, setSortOption] = useState('name');

  return (
    <>
      <div className="phones-page">
        <MainNavigation />

        <div className="phones-page__content">
          <h1 className="phones-page__title">
            Mobile phones
          </h1>

          <p className="phones-page__subtitle">
            {`${phones.length} models`}
          </p>

          <Selection
            phones={phones}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            setSortedPhones={setSortedPhones}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />

          {/* {console.log(sortedPhones.length)} */}

          <div className="phones-page__list">
            {sortedPhones.map(phone => {
              return (
                <div className="phones-page__list--item" key={phone.id}>
                  <PhoneCard phone={phone} />
                </div>
              );
            })}
          </div>

          {itemsPerPage !== 'all' && (
            <Bottom
              phones={phones}
              // sortedPhones={sortedPhones}
              itemsPerPage={itemsPerPage}
              setSortedPhones={setSortedPhones}
            />
          )}
        </div>
      </div>
    </>
  );
};
