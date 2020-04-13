import React, { FC, useState, useEffect } from 'react';
import './_Catalog.scss';
import { PhoneInterface } from '../../constants/types';
import { PhoneThumb } from '../PhoneThumb';
import { Pagination } from '../Pagination';

interface Props {
  phonesArray: PhoneInterface[];
}

export const Catalog: FC<Props> = ({ phonesArray }) => {
  const [
    visiblePhones, setVisiblePhones,
  ] = useState<PhoneInterface[]>(phonesArray);

  const [currentPage, setCurrentPage] = useState(1);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [phonesPerPage, setPhonesPerPage] = useState(16);

  const indexOfLastPhone = currentPage * phonesPerPage;
  const indexOfFirstPhone = indexOfLastPhone - phonesPerPage;
  const currentPhones = visiblePhones
    .slice(indexOfFirstPhone, indexOfLastPhone);

  const paginate = (numberOfPage: number) => {
    setCurrentPage(numberOfPage);
  };

  useEffect(() => {
    setVisiblePhones(phonesArray);
  }, [phonesArray]);

  return (
    <>
      <ul className="catalog">
        {currentPhones.map((phone: PhoneInterface) => (
          <li
            className="catalog__item phoneThumb"
            key={phone.id}
          >
            <PhoneThumb
              data={phone}
            />
          </li>
        ))}
      </ul>
      {visiblePhones.length > 16 && (
        <Pagination
          phonesPerPage={phonesPerPage}
          totalPhones={visiblePhones.length}
          paginate={paginate}
        />
      )}
    </>
  );
};
