import React, { FC, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Title from './Title';
import { Phone } from '../interfaces/interfaces';
import { RootState, getCurrentPhone, loadPhone } from '../store';
import Breadcrumbs from './Breadcrumbs';

type Props = {
  phoneId: string;
  phoneLoad: (id: string) => void;
  phone: Phone;
};

const PhonePage: FC<Props> = ({ phoneId, phoneLoad, phone }) => {
  useEffect(() => {
    phoneLoad(phoneId);
  });

  return (
    <div className="phone">
      <Breadcrumbs title="Phones" subtitle={phone.name} />
      <NavLink to="/" className="phone__breadcrumb-link">
        <div className="phone__breadcrumb">
          <img
            src="img/icons/breadcrumbs-arrow.svg"
            alt="back icon"
            className="phone__breadcrumb-arrow"
          />
          <p className="phone__breadcrumb-text">Back</p>
        </div>
      </NavLink>
      <Title title={phone.name} />
      <div className="phone__container">
        <div className="phone__images">
          {phone.images.map(image => (
            <div className="phone__image-mini-container">
              <img
                src={image}
                alt="item"
                className="phone__image-mini"
              />
            </div>

          ))}
        </div>
        <div className="phone__image-container">
          <img
            src={phone.images[0]}
            alt="main"
            className="phone__image"
          />
        </div>

        <div className="phone__info">
          <div className="phone__colors">
            <small className="phone__available-text">Available colors</small>
            <div className="phone__available-colors">
              {phone.colorsAvailable.map(color => (
                <div className="phone__available-color" style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
          <div className="phone__capacity">
            <small>Select capacity</small>
            <div>
              capacites
            </div>
          </div>
          <div className="phone__price">
            <h2>Discount</h2>
            <p>Price</p>
          </div>
          <div className="phone__actions">
            <button type="button">Add to cart</button>
            <button type="button">Like</button>
          </div>
          <div className="phone__characteristics">
            <div>
              <p>Screen</p>
              <p />
            </div>
            <div>
              <p>Resolution</p>
              <p />
            </div>
            <div>
              <p>Processor</p>
              <p />
            </div>
            <div>
              <p>RAM</p>
              <p />
            </div>
          </div>
        </div>
        <div className="phone__id">Id</div>
      </div>

      <div className="phone__container--about">
        <div className="phone__about">
          <h2>About</h2>
          <h3>
            <p>text</p>
          </h3>
          <h3>
            <p>text</p>
          </h3>
          <h3>
            <p>text</p>
          </h3>
        </div>
        <div className="phone__specs">
          <h2>Tech Specs</h2>
          <div>
            <div>
              <p>Screen</p>
              <p />
            </div>
            <div>
              <p>Resolution</p>
              <p />
            </div>
            <div>
              <p>Processor</p>
              <p />
            </div>
            <div>
              <p>RAM</p>
              <p />
            </div>
            <div>
              <p>Built in memory</p>
              <p />
            </div>
            <div>
              <p>Camera</p>
              <p />
            </div>
            <div>
              <p>Zoom</p>
              <p />
            </div>
            <div>
              <p>Cell</p>
              <p />
            </div>
          </div>
        </div>
      </div>
      <Title title="You may also like" />
    </div>
  );
};

const mapState = (state: RootState) => ({
  phone: getCurrentPhone(state),
});

const mapDispatch = {
  phoneLoad: loadPhone,
};

export default connect(mapState, mapDispatch)(PhonePage);
