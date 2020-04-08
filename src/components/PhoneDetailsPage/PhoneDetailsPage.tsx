import React, { FC, useMemo } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import {
  loadPhone as loadPhoneStore,
} from '../../store/store';

interface MatchParams {
  phoneId: string;
}

interface StateProps {
  phoneDetails: Details | null;
  phoneError: string;
}

interface DispatchProps {
  loadPhone: (value: string) => void;
}

const PhoneDetailsPageTemplate: FC<
  RouteComponentProps<MatchParams> & StateProps & DispatchProps
> = ({
  phoneDetails,
  loadPhone,
  match,
  phoneError,
}) => {
  useMemo(() => loadPhone(match.params.phoneId), []);

  if (phoneError || !phoneDetails) {
    return (
      <>
        <div>Phone not found</div>
      </>
    );
  }

  return (
    <>
      <div>{phoneDetails.name}</div>
    </>
  );
};

const mapStateToProps = (state: State) => ({
  phoneDetails: state.phoneDetails,
  phoneError: state.phoneError,
});

const mapDispatchToProps = {
  loadPhone: loadPhoneStore,
};

export const PhoneDetailsPage = connect(
  mapStateToProps, mapDispatchToProps,
)(PhoneDetailsPageTemplate);
