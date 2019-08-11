import React, { useState, useEffect, useContext } from 'react';
import { BasketContext } from './App';
import { getDetails } from './sources';
import Loader from './Loader';

const PhoneDetailsPage = ({ match }) => {
  const { handleCliCkAdd , items } = useContext(BasketContext);
  const [isLoaded, setLoaded] = useState(false);
  const [details, setDetails] = useState([]);
  const [activeImage, setActiveImage] = useState(0);


  useEffect(() => {
    (async () => {
      const detailsFromServer = await getDetails(match.params.idPhone);
      setDetails(detailsFromServer);
      setLoaded(true);
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

  console.log(details)

  if (!isLoaded) {
    return (
      <Loader />
    )
  }

  return (
    <>
      <div className="phone-container">
        <section className="phone-pictures-container">
          <img
            className="main-picture"
            onClick={() => handleClickNext()}
            src={`/${details.images && details.images[activeImage]}`}
            alt={details.id}
          />

          {details.images && details.images.map((image, i) => (

            <img className={`image-detail ${i === activeImage && `active-image`}`} src={`/${image}`}
              alt={details.id}
              onClick={() => handleClickImage(i)}
            />
          ))
          }
        </section>
        <section className="phone-detail-container">
          <div className="item-header">
            <h2>{details.id}</h2>
            <button className="add-button" type="button" onClick={()=>handleCliCkAdd({id: details.id, imageUrl: details.images[0] })}>
              {items.some(item => item.id===details.id) ? "ADD MORE" : "ADD TO CART" }
              </button>
          </div>

          <p>{details.description}</p>
          <div className="phone-additional">
            Details...
          </div>
        </section>

      </div>
    </>
  )
}

export default PhoneDetailsPage;
