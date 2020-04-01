import React, { FC, useEffect } from 'react';
import './_PhoneCatalog.scss';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { PhoneInterface, State } from '../../constants/types';
import { PhoneThumb } from '../PhoneThumb/PhoneThumb';
import { loadPhones } from '../../store/store';
import { getPhones, getIsLoading } from '../../store/rootReducer';

interface Props {
  phones: PhoneInterface[];
  loadPhones: () => void;
  isLoading: boolean;
}

export const PhoneCatalogTemplate: FC<Props> = (props) => {
  const {
    phones,
    loadPhones: loadData,
    isLoading,
  } = props;

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader
          type="Puff"
          color="#00bfff"
          height={100}
          width={100}
        />
      ) : (
        <ul className="phoneCatalog">
          {phones.map((phone: PhoneInterface) => (
            <li className="phoneCatalog__item" key={phone.id}>
              <PhoneThumb
                data={phone}
              />
            </li>
          ))}
        </ul>
      )
      }
    </>
  );
};

const mapDispatchToProps = { loadPhones };

const mapStateToProps = (state: State) => ({
  phones: getPhones(state),
  isLoading: getIsLoading(state),
});

export const PhoneCatalog
  = connect(mapStateToProps, mapDispatchToProps)(PhoneCatalogTemplate);
