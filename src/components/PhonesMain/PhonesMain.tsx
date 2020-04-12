import React, { FC, useEffect } from 'react';
import './_PhonesMain.scss';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { Catalog } from '../Catalog/Catalog';
import { PhoneInterface, PhoneState, LoadState } from '../../constants/types';
import { Breadcrumbs } from '../Breadcrumbs';
import { Filters } from '../Filters';
import { searchCallback } from '../../utils/api';
import { getPhones, getQuery } from '../../store/reducers/phoneReducer';
import { getIsLoadingPhones } from '../../store/reducers/loadingReducer';
import { loadPhones } from '../../store/actionCreators';

interface Props {
  phones: PhoneInterface[];
  loadPhones: () => void;
  isLoadingPhones: boolean;
  query: string;
}

export const PhonesTemplate: FC<Props> = (props) => {
  const {
    phones,
    loadPhones: loadData,
    isLoadingPhones,
    query,
  } = props;

  useEffect(() => {
    loadData();
  }, []);

  const searchedPhones = phones.filter(searchCallback(query));

  if (isLoadingPhones) {
    return (

      <section className="phones">
        <div className="phones__container wrapper">

          <Breadcrumbs phonesArray={phones} directory="Phones" />

          <Loader
            type="Puff"
            color="#00bfff"
            height={400}
            width={400}
          />

        </div>
      </section>
    );
  }

  return (

    <section className="phones">
      <div className="phones__container wrapper">

        <Breadcrumbs phonesArray={phones} directory="Phones" />

        <Filters />
        <Catalog phonesArray={searchedPhones} />

      </div>
    </section>

  );
};

const mapDispatchToProps = { loadPhones };

const mapStateToProps = (state: {
  phoneReducer: PhoneState;
  loadingReducer: LoadState;
}) => ({
  phones: getPhones(state.phoneReducer),
  isLoadingPhones: getIsLoadingPhones(state.loadingReducer),
  query: getQuery(state.phoneReducer),
});

// eslint-disable-next-line max-len
export const PhonesMain = connect(mapStateToProps, mapDispatchToProps)(PhonesTemplate);
