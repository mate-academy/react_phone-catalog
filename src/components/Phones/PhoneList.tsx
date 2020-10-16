import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, match as mathProps } from 'react-router-dom';
// eslint-disable-next-line max-len
import { fetchPhones as fetchPhonesAPI } from '../../redux/phones/phonesOperations';
import { Loader } from '../Loader/Loader';
import './Phones.scss';

interface Props {
  phones: Phone[];
  isLoading: boolean;
  fetchPhones: () => void;
  match: mathProps;
}

const PhoneList: FC<Props> = ({ phones, isLoading, fetchPhones, match }) => {
  useEffect(() => {
    console.log('sosa');
    fetchPhones();
  }, [fetchPhones]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="phones">
      {phones.map(phone => (
        <div className="card" key={phone.age}>
          <Link to={`${match.path}/${phone.id}`}>
            <img
              src={phone.imageUrl}
              className="card-img-top card__img"
              alt={phone.name}
            />
          </Link>
          <div className="card-body">
            <h5 className="card-title card__title">{phone.name}</h5>
            <p className="card-text card__text">{phone.snippet}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    phones: state.phones.phones,
    isLoading: state.phones.isLoading,
  };
};

const mapDispatchToProps = {
  fetchPhones: fetchPhonesAPI,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PhoneList),
);
