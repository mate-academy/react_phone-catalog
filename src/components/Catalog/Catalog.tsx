import React, { FC, useState, useEffect } from 'react';
import './_Catalog.scss';
import { connect } from 'react-redux';
import { PhoneInterface, PhoneState } from '../../constants/types';
import PhoneCard from '../PhoneCard/PhoneCard';
import { Pagination } from '../Pagination';
import { getPagination } from '../../store/reducers/phoneReducer';

interface Props {
  phonesArray: PhoneInterface[];
  paginationPage: number;
}

const Catalog: FC<Props> = ({ phonesArray, paginationPage }) => {
  const [
    visiblePhones, setVisiblePhones,
  ] = useState<PhoneInterface[]>(phonesArray);

  const [currentPage, setCurrentPage] = useState(1);

  const [phonesPerPage, setPhonesPerPage] = useState(paginationPage);

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

  useEffect(() => {
    setCurrentPage(1);
    setPhonesPerPage(paginationPage);
  }, [paginationPage]);

  const handlePage = (num: number) => {
    setCurrentPage(currentPage + num);
  };

  return (
    <>
      <ul className="catalog">
        {currentPhones.map((phone: PhoneInterface) => (
          <li
            className="catalog__item phoneCard"
            key={phone.id}
          >
            <PhoneCard
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
          currentPage={currentPage}
          handlePage={handlePage}
        />
      )}
    </>
  );
};

const mapStateToProps = (state: {
  phoneReducer: PhoneState;
}) => ({
  paginationPage: getPagination(state.phoneReducer),
});

export default connect(mapStateToProps)(Catalog);
