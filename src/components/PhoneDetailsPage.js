import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import PhoneDetais from './PhoneDetails';

/* eslint-disable-next-line */
const PhoneDetailsPage = ({match, history, onAddToBasket}) => {
  const [phone, setPhone] = useState([]);
  const [loader, setLoader] = useState(0);
  const [error, setError] = useState(0);

  useEffect(() => {
    (async() => {
      try {
        /* eslint-disable-next-line */
        const data = await fetch(`https://mate-academy.github.io/phone-catalogue-static/api/phones/${match.params.id}.json`);
        const phoneData = await data.json();

        setPhone(phoneData);
      } catch (err) {
        setError(err);
      }
    })();

    setTimeout(() => setLoader(true), 1000);
  }, []);

  return (
    <div className="section section_details">
      <div className="section__button indent-mb-m">
        <button
          type="button"
          onClick={history.goBack}
        >
          GO BACK
        </button>
      </div>
      { error ? (
        <div className="error">
          Sorry, phone not found
        </div>
      ) : (
        <>
          { loader ? (
            <PhoneDetais
              phone={phone}
              onAddToBasket={onAddToBasket}
            />
          ) : (
            <Loader />
          )}
        </>
      )}
    </div>
  );
};

export default React.memo(PhoneDetailsPage);
