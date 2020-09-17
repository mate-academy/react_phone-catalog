import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllPhones, RootState, loadPhones, getSearchedData, search } from '../store';

import Breadcrumbs from './Breadcrumbs';
import Title from './Title';
import ProductCard from './ProductCard';

import { Phones } from '../interfaces/interfaces';

type Props = {
  phonesLoad: () => void;
  allPhones: Phones[];
  searchedData: string;
  searchData: (inputData: string) => void;
};

const PhonesPage: FC<Props> = ({ phonesLoad, allPhones, searchedData, searchData }) => {
  useEffect(() => {
    phonesLoad();
    searchData('');
  }, [phonesLoad, searchData]);

  return (
    <div className="phones">
      <Breadcrumbs title="Phones" subtitle="" />
      <Title title="Mobile phones" />
      <p className="phones__quantity">
        {allPhones.length}
        &nbsp;models
      </p>
      <div className="phones__grid">
        {allPhones
          .sort((a, b) => a.name.localeCompare(b.name))
          .filter(phone => phone.phoneId.includes(searchedData))
          .map(phone => (
            <div key={phone.id}>
              <ProductCard phone={phone} />
            </div>
          ))}
      </div>
    </div>
  );
};

const mapState = (state: RootState) => ({
  allPhones: getAllPhones(state),
  searchedData: getSearchedData(state),
});

const mapDispatch = {
  phonesLoad: loadPhones,
  searchData: search,
};

export default connect(mapState, mapDispatch)(PhonesPage);
