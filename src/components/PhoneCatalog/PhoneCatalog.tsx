import React, { FC, useMemo, Suspense } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import {
  loadPhones as loadPhonesStore,
} from '../../store/store';

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
    <>
      <Suspense fallback={(
        <Loader
          type="TailSpin"
          color="#000000"
          height={100}
          width={100}
        />
      )}
      >
        <div className="catalog">
          {phones.map(phone => (
            <PhoneCardLazy key={phone.id} phone={phone} />
          ))}
        </div>
      </Suspense>
    </>
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
