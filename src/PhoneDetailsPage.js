import React, { useState, useEffect } from 'react';
import { getDetails } from './sources';
import Loader from './Loader';

  const PhoneDetailsPage = ( props ) => {
    const [details, setDetails] = useState([]);
    useEffect(() => {
      (async () => {
        const detailsFromServer = await getDetails(props.match.params.idPhone);
        setDetails(detailsFromServer);
      })();
    }, []);
    console.log(props);
  return (
    <h1>{details.id}</h1>
  )
}

export default PhoneDetailsPage;
