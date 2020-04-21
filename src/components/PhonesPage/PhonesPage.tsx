import React, { FC, useEffect, Dispatch } from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import './PhonesPage.scss';
import { getPhones } from '../../api';
import { PhonesList } from './PhonesList/PhonesList';
import {
  setPhonesAction,
  startLoadingAction,
  stopLoadingAction,
  setIsLoadedAction,
} from '../../redux/actionCreators';
import Loader from 'react-loader-spinner';

interface Props {
  phones: Phone[];
  isLoaded: boolean;
  isLoading: boolean;
  setPhones: (phones: Phone[]) => void;
  startIsLoading: () => void;
  setIsLoaded: () => void;
  stopIsLoading: () => void;
}

type StateProps = Pick<Props, 'phones'>;

type DispatchProps = Pick<Props,
'setPhones'
| 'startIsLoading'
| 'setIsLoaded'
| 'stopIsLoading'>;

const PhonesPage: FC<Props> = ({
  phones,
  setPhones,
  isLoaded,
  isLoading,
  startIsLoading,
  stopIsLoading,
  setIsLoaded,
}) => {
  const handleLoad = () => {
    startIsLoading();
    getPhones().then(phonesFromServer => {
      setPhones(phonesFromServer);
      setIsLoaded();
      stopIsLoading();
    });
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <section className="phones-page">
      <div className="section-wrapper">
        <h1 className="phones-page__title">Mobile phones</h1>
        {isLoading
        && (
          <div className="loader-wrapper">
            <Loader
              type="Puff"
              color="#313237"
              height={80}
              width={80}
            />
          </div>
        )}

        {(isLoaded) && (<PhonesList phones={phones} />)}
      </div>
    </section>
  );
};

const mapStateToProps = (state: RootState) => ({
  phones: state.phones,
  isLoaded: state.isLoaded,
  isLoading: state.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  setPhones: (phones: Phone[]) => dispatch(setPhonesAction(phones)),
  startIsLoading: () => dispatch(startLoadingAction()),
  stopIsLoading: () => dispatch(stopLoadingAction()),
  setIsLoaded: () => dispatch(setIsLoadedAction()),
});

const Enhanced = connect<StateProps, DispatchProps, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(PhonesPage);

export { Enhanced as PhonesPage };
