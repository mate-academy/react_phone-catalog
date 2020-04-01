import React, { FC } from 'react';
import './_Phones.scss';
import { connect } from 'react-redux';
import { PhoneCatalog } from '../PhoneCatalog/PhoneCatalog';
import { getPhones } from '../../store/rootReducer';
import { State, PhoneInterface } from '../../constants/types';
import { setSortBy } from '../../store/actionCreators';

interface Props {
  phones: PhoneInterface[];
  setSortBy: (filter: string) => void;
}

export const PhonesTemplate: FC<Props> = (props) => {
  const { phones, setSortBy: setSortByTemplate } = props;

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortType = event.target.value;

    // eslint-disable-next-line no-console
    console.log(sortType);

    setSortByTemplate(sortType);
  };

  return (
    <main className="main">
      <section className="phones">
        <div className="phones__wrapper">
          <div className="phones__breadcrumbs">
            <span className="phones__home-logo" />
            <p className="phones__location">Phones</p>
          </div>
          <div className="phones__main-info">
            <h3 className="phones__title">Mobile phones</h3>
            <span className="phones__number">
              {phones.length ? `${phones.length} phones` : `no phones`}
            </span>
          </div>
          <div className="phones__filters">
            <div className="phones__filter">
              <span className="phone__type-filter">Sort by</span>
              <select
                className="phone__filter"
                onChange={handleSelect}
                defaultValue="disabled"
              >
                <option value="disabled" disabled>Sort by</option>
                <option value="age">Age</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
          <PhoneCatalog />
        </div>
      </section>
    </main>
  );
};

const mapDispatchToProps = { setSortBy };

const mapStateToProps = (state: State) => ({
  phones: getPhones(state),
});

// eslint-disable-next-line max-len
export const Phones = connect(mapStateToProps, mapDispatchToProps)(PhonesTemplate);
