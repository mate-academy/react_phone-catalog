import React, { useEffect, FC } from 'react';
import './_PhoneDetails.scss';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import PhoneInfo from '../PhoneInfo/PhoneInfo';
import {
  PhoneDetailsInterface,
  LoadState,
  PhoneState,
} from '../../constants/types';
import { getIsLoadingDetails } from '../../store/reducers/loadingReducer';
import { getDetails } from '../../store/reducers/phoneReducer';
import { loadDetails } from '../../store/actionCreators';
import { SmallCatalog } from '../SmallCatalog';

type Props = {
  phoneId: string;
  isLoadingDetails: boolean;
  details: PhoneDetailsInterface | null;
  loadDetails: (uniqueKey: string) => void;
}

const PhoneDetails: FC<Props> = (props) => {
  const {
    isLoadingDetails,
    details,
    loadDetails: loadDetailsTemplate,
    phoneId,
  } = props;

  useEffect(() => {
    loadDetailsTemplate(phoneId);
  }, []);

  if (isLoadingDetails) {
    return (
      <section className="phoneDetails">
        <div className="phoneDetails__container wrapper">
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

  if (!details) {
    return (

      <section className="phoneDetails">
        <div className="phoneDetails__container wrapper">
          <div>
            <h2 className="phoneDetails__noMatch">No such phone</h2>
          </div>
        </div>
      </section>
    );
  }

  return (

    <section className="phoneDetails">
      <div className="phoneDetails__container wrapper">

        <PhoneInfo phoneData={details} phoneId={phoneId} />

        <SmallCatalog titleName="You may also like" />
      </div>
    </section>

  );
};

const mapDispatchToProps = { loadDetails };

const mapStateToProps = (state: {
  loadingReducer: LoadState;
  phoneReducer: PhoneState;
}) => ({
  isLoadingDetails: getIsLoadingDetails(state.loadingReducer),
  details: getDetails(state.phoneReducer),
});

// eslint-disable-next-line max-len
export default connect(mapStateToProps, mapDispatchToProps)(PhoneDetails);
