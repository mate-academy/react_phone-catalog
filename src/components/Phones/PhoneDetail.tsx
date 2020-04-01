import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { match as matchProp } from 'react-router';
// eslint-disable-next-line max-len
import { fetchPhonesDetail } from '../../redux/phoneDetail/phoneDetailOperations';
import { Loader } from '../Loader/Loader';

interface Params {
  id: string;
}

interface Props {
  phoneDetail: {};
  fetchPhones: (id: string) => void;
  isLoading: boolean;
  match: matchProp<Params>;
}

const PhoneDetail: FC<Props> = ({
  phoneDetail,
  fetchPhones,
  isLoading,
  match,
}) => {
  const { id } = match.params;

  console.log(phoneDetail);

  useEffect(() => {
    fetchPhones(id);
  }, [fetchPhones, id]);

  console.log(phoneDetail);

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <div>
      Hello
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    phoneDetail: state.phoneDetail.phoneDetail,
    isLoading: state.phoneDetail.isLoading,
  };
};

const mapDispatchToProps = {
  fetchPhones: fetchPhonesDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneDetail);
