import React, { FC, useEffect } from 'react';
import './_PhonesMain.scss';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { Catalog } from '../Catalog/Catalog';
import { getPhones, getIsLoadingPhones } from '../../store/rootReducer';
import { State, PhoneInterface } from '../../constants/types';
import { Breadcrumbs } from '../Breadcrumbs';
import { loadPhones } from '../../store/store';
import { Filters } from '../Filters';

interface Props {
  phones: PhoneInterface[];
  loadPhones: () => void;
  isLoading: boolean;
}

export const PhonesTemplate: FC<Props> = (props) => {
  const {
    phones,
    loadPhones: loadData,
    isLoading,
  } = props;

  useEffect(() => {
    loadData();
  }, []);

  return (

    <section className="phones">
      <div className="phones__container wrapper">

        <Breadcrumbs phonesArray={phones} directory="Phones" />

        {
          isLoading ? (
            <Loader
              type="Puff"
              color="#00bfff"
              height={400}
              width={400}
              timeout={5000}
            />
          ) : (
            <>
              <Filters />
              <Catalog phonesArray={phones} />
            </>
          )}
      </div>
    </section>

  );
};

const mapDispatchToProps = { loadPhones };

const mapStateToProps = (state: State) => ({
  phones: getPhones(state),
  isLoading: getIsLoadingPhones(state),
});

// eslint-disable-next-line max-len
export const PhonesMain = connect(mapStateToProps, mapDispatchToProps)(PhonesTemplate);
