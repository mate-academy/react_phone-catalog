import React, { useState, useEffect } from 'react';
import { getDetails } from './sources';
import Loader from './Loader';

const PhoneDetailsPage = ({ match }) => {
  const [details, setDetails] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  useEffect(() => {
    (async () => {
      const detailsFromServer = await getDetails(match.params.idPhone);
      setDetails(detailsFromServer);
    })();
  }, []);

  const handleClickImage = (id) => {
    setActiveImage(id);
  }

  const handleClickNext = () => {
    let newActiveId = 0;
    if (activeImage !== details.images.length - 1) {
      newActiveId = activeImage + 1;
    }
    setActiveImage(newActiveId);
  }

  console.log(details.description)

  return (
    <>
    <section>
      {details.images && details.images.map((image, i) => {

        return (

          <img className={`image-detail ${i === activeImage && `active-image`}`} src={`/${image}`}
            alt={details.id}
            onClick={() => handleClickImage(i)}

          />
        )
      }
      )
      }

      <img
        onClick={() => handleClickNext()}
        src={`/${details.images && details.images[activeImage]}`}
        alt={details.id}
      />
</section>
      <p>{details.description}</p>
      <h1>{details.id}</h1>
    </>
  )
}

export default PhoneDetailsPage;
