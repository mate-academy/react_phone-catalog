import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import PhoneDetais from './PhoneDetails';

/* eslint-disable-next-line */
const PhoneDetailsPage = ({ match }) => {
  useEffect(() => {
    fetchPhone();
    setTimeout(() => setLoader(true), 1000);
  }, [match]);

  const [phone, setPhone] = useState([]);
  const [loader, setLoader] = useState(0);
  const [error, setError] = useState(0);
  const fetchPhone = async() => {
    try {
      /* eslint-disable-next-line */
      const data = await fetch(`https://mate-academy.github.io/phone-catalogue-static/api/phones/${match.params.id}.json`);
      const phoneData = await data.json();

      setPhone(phoneData);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div>
      { error ? (
        <div className="error">
          Sorry, phone not found
        </div>
      ) : (
        <>
          { loader ? (
            <div>
              <PhoneDetais phone={phone} />
            </div>
          ) : (
            <Loader />
          )}
        </>
      )}
    </div>
  );
};

export default PhoneDetailsPage;
