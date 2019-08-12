import React, { useEffect, useState } from 'react';

import PhoneDetails from './PhoneDetails';
import NotFound from './NotFound';

const PhoneDetailsPage = ({ match }) => {
  const getData = async(id) => {
    const url = `https://mate-academy.github.io/phone-catalogue-static/api/phones/${id}.json`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      return data;
    }

    return;
  }

  const [data, setData] = useState({});

  useEffect(() => {
    (async() => {
      const info = await getData(match.params.phoneId);

      setData(info);
    })();
  });

  return (
    <>
      {
        data
          ? (
            data.id
              ? (
                <PhoneDetails phoneDetails={data} />
              )
              : <div>Loading...</div>
          )
          : <NotFound />

      }
    </>
  );
};

export default PhoneDetailsPage;
