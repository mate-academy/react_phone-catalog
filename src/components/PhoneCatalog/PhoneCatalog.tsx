import React, { FC, useMemo, Suspense } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import {
  loadPhones as loadPhonesStore,
} from '../../store/store';

import './PhoneCatalog.css';

const PhoneCardLazy = React.lazy(() => import('../PhoneCard/PhoneCard')
  .then(({ PhoneCard }) => ({ default: PhoneCard })));

interface StateProps {
  phones: PhonesWithDetails[];
}

interface DispatchProps {
  loadPhones: () => void;
}

const PhoneCatalogTemplate: FC<StateProps & DispatchProps> = ({
  phones,
  loadPhones,
}) => {
  useMemo(loadPhones, []);

  return (
    <div className="phones__container">
      <Suspense fallback={(
        <div className="loader__container">
          <Loader
            type="TailSpin"
            color="#000000"
            height={100}
            width={100}
          />
        </div>
      )}
      >
        <div className="phones__path">
          <img src="/img/Home.png" alt="home_icon" className="home-icon" />
          <img src="/img/Chevron.png" alt="arrow_icon" className="arrow-icon" />
          <span className="phones__path-title">Phones</span>
        </div>
        <h2 className="phones__heding">Mobile phones</h2>
        <p className="phones__quantity">{`${phones.length} models`}</p>
        <p className="phones__sort-title">Sort by</p>
        <select className="phones__sort-select">
          <option value="">Price</option>
          <option value="">Name</option>
          <option value="">RAM</option>
          <option value="">Capacity</option>
        </select>
        <div className="phones__catalog">
          {phones.map(phone => (
            <PhoneCardLazy key={phone.id} phone={phone} />
          ))}
        </div>
      </Suspense>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  phones: state.phones,
});

const mapDispatchToProps = {
  loadPhones: loadPhonesStore,
};

export const PhoneCatalog = connect<StateProps, DispatchProps, {}, State>(
  mapStateToProps, mapDispatchToProps,
)(PhoneCatalogTemplate);
