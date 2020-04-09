import React, { useEffect, FC } from 'react';
import './_PhoneDetailsMain.scss';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { PhoneDetais } from '../PhoneDetais/PhoneDetais';
import { State, PhoneDetailsInterface } from '../../constants/types';
import { getIsLoadingDetails, loadDetails, getDetails } from '../../store';

type Props = {
  phoneId: string;
  isLoadingDetails: boolean;
  details: PhoneDetailsInterface | null;
  loadDetails: (id: string) => void;
}

export const PhoneDetailsMainTemplate: FC<Props> = (props) => {
  const {
    isLoadingDetails,
    details,
    loadDetails: loadDetailsTemplate,
  } = props;

  const { phoneId } = props;

  useEffect(() => {
    loadDetailsTemplate(phoneId);
  }, []);

  useEffect(() => {
    loadDetailsTemplate(phoneId);
  }, [phoneId]);

  if (isLoadingDetails) {
    return (
      <section className="phoneDetaisMain">
        <div className="phoneDetailsMain__container wrapper">
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

      <section className="phoneDetaisMain">
        <div className="phoneDetailsMain__container wrapper">
          <div>
            <h2 className="phoneDetailsMain__noMatch">No such phone</h2>
          </div>
        </div>
      </section>
    );
  }

  return (

    <section className="phoneDetaisMain">
      <div className="phoneDetailsMain__container wrapper">

        <PhoneDetais phoneData={details} phoneId={phoneId} />

        <div className="phoneDetailsMain__likePhones">
          <div className="phoneDetailsMain__prices-top">
            <h3 className="phoneDetailsMain__title">You may also like</h3>
            <div className="phoneDetailsMain__control-btns">
              <button
                type="button"
                className="phoneDetailsMain__price-btn
                      phoneDetailsMain__price-btn--left"
              >
                <img
                  src="/img/arrow.svg"
                  alt="arrow_control_left"
                  className="phoneDetailsMain__price-arrow
                        phoneDetailsMain__price-arrow--left"
                />
              </button>
              <button
                type="button"
                className="phoneDetailsMain__price-btn
                      phoneDetailsMain__price-btn--right"
              >
                <img
                  src="/img/arrow.svg"
                  alt="arrow_control_left"
                  className="phoneDetailsMain__price-arrow
                        phoneDetailsMain__price-arrow--right"
                />
              </button>
            </div>
          </div>
          <div className="phoneDetailsMain__prices-main">
            <div className="temp-block" />
            <div className="temp-block" />
            <div className="temp-block" />
            <div className="temp-block" />
          </div>
        </div>
      </div>
    </section>

  );
};

const mapDispatchToProps = { loadDetails };

const mapStateToProps = (state: State) => ({
  isLoadingDetails: getIsLoadingDetails(state),
  details: getDetails(state),
});

// eslint-disable-next-line max-len
export const PhoneDetailsMain = connect(mapStateToProps, mapDispatchToProps)(PhoneDetailsMainTemplate);
