import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Error } from '../../components/error/Error';
import { Loader } from '../../components/Loader/Loader';
import { Way } from '../../components/way/Way';
import { requestDetailsProduct } from '../../helpers/api';
import { IproductDetails } from '../../types/productDetails';
import { Capacity } from './components/capacity/Capacity';
import { Colors } from './components/colors/Colors';
import { Photos } from './components/photos/Photos';
import { Price } from './components/price/Price';
import { Property } from './components/property/Property';

import './productDetails.scss';

export const ProductDetails = () => {
  const { id = '' } = useParams();
  const [details, setDetails] = useState<IproductDetails | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (id) {
      requestDetailsProduct(id).then((res) => setDetails(res))
        .catch(() => setError(true));
    }
  }, [id]);

  const renderDetails = useMemo(() => {
    return (
      details && !error ? (
        <div>
          <h1>{details.name}</h1>
          <div className="wrapper-info">
            <Photos listImages={details.images} />
            <div>
              <Colors />
              <Capacity />
              <Price details={details} />
            </div>
          </div>
          <div className="describe-details">
            <div className="describe-details__about">
              <h2>About</h2>
              <p>{details.description}</p>
            </div>
            <div className="describe-details__tech">
              <h2>Tech specs</h2>
              <div>
                <Property
                  title="Sreen"
                  value={details.display.screenSize}
                />
                <Property
                  title="Resolution"
                  value={details.display.screenResolution}
                />
                <Property
                  title="Processor"
                  value={details.hardware.cpu}
                />

                <Property
                  title="RAM"
                  value={details.storage.ram}
                />
                <Property
                  title="Built in memory"
                  value={details.storage.flash}
                />
                <Property
                  title="Camera"
                  value={details.camera.primary}
                />
                <Property
                  title="Cell"
                  value={details.connectivity.cell}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error
          text="Something went wrong please check your connect with internet"
        />
      )
    );
  }, [details, error]);

  return (
    <section className="details-wrapper">
      <Way />
      {!details ? <Loader /> : renderDetails}
    </section>
  );
};
