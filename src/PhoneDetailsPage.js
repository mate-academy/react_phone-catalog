import React, { useState, useEffect } from 'react';
import { getDetails } from './sources';
import Loader from './Loader';

const PhoneDetailsPage = ({ match }) => {
  const [details, setDetails] = useState([]);
  useEffect(() => {
    (async () => {
      const detailsFromServer = await getDetails(match.params.idPhone);
      setDetails(detailsFromServer);
    })();
  }, []);

  return (
    <>
      <h1>{details.id}</h1>
      {details.images && details.images.map(image => {

        return (
          <img src={`/${image}`} alt={details.id} height="42" width="42"></img>
        )
      }
      )
      }
    </>
  )
}

export default PhoneDetailsPage;
