import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { HeaderDetails } from '../../Components/HeaderDetails/HeaderDetails';
import { GalleryDetails } from '../../Components/GalleryDetails/GalleryDetails';
import { ProductInfo } from '../../types/ProductInfo';
import { AddtoCardDetails }
  from '../../Components/AddtoCardDetails/AddtoCardDetails';
import { AboutDetails } from '../../Components/AboutDetails/AboutDetails';
import { SpecsDetails } from '../../Components/SpecsDetails/SpecsDetails';
import { Phone } from '../../types/Phone';
import './Details.scss';

type Props = {
  productCategory: string;
};

export const Details: React.FC<Props> = ({ productCategory }) => {
  const { id } = useParams();
  const { getDetailsFetch, getFetch } = useFetch();
  const [product, setProduct] = useState<null | Phone>(null);
  const [productDescription, setProductDescription]
  = useState<null | ProductInfo>(null);

  useEffect(() => {
    if (id) {
      getDetailsFetch(id)
        .then(res => {
          if (res) {
            setProductDescription(res);
          }
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.warn(err);
        });

      getFetch()
        .then(res => {
          if (res) {
            const phone = res.find(el => el.id === id);

            if (phone) {
              setProduct(phone);
            }
          }
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.warn(err);
        });
    }
  }, [id]);

  return (
    <div className="Details">
      <div className="Details__wrapper">
        {
          productDescription && (
            <>
              <HeaderDetails
                productDescription={productDescription}
                productCategory={productCategory}
              />
              <div className="Details__firstRow">
                <GalleryDetails
                  productDescription={productDescription.images}
                />
                {
                  product && (
                    <AddtoCardDetails
                      product={product}
                      productDescription={productDescription}
                    />
                  )
                }
              </div>
              <div className="Details__secondRow">
                <AboutDetails
                  productDescription={productDescription.description}
                />
                <SpecsDetails
                  productDescription={productDescription}
                />
              </div>
            </>
          )
        }
      </div>
    </div>
  );
};
