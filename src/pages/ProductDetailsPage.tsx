import { useEffect, useState } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { fetchDetailsData } from '../helpers/Api';
import { ProductDetails } from '../helpers/Types';
import { Details } from '../components/Details';
import { Loader } from '../components/Loader';

export type ProductDetailsParams = {
  productId: string;
};

export const ProductDetailsPage = () => {
  const location = useLocation().pathname.slice(1).split('/');
  const navigate = useNavigate();
  const { productId } = useParams<ProductDetailsParams>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [downloadError, setDownloadError] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      try {
        if (productId) {
          const detailedData = await fetchDetailsData(productId);

          setProduct(detailedData);
          setDownloadError(false);
        }
      } catch (error) {
        setDownloadError(true);
      }
    };

    getData();
  }, [productId]);

  return (
    <div className="page">
      <div className="page__path" data-cy="breadCrumbs">
        <Link to="/" className="page__path--home">
          <img
            alt="arrowTop"
            src="./img/home.svg"
            className="page__path--home-image"
          />
        </Link>
        <img
          alt="arrowTop"
          src="./img/arrowRight.svg"
          className="page__path--prev"
        />
        <Link to={`/${location[0]}`} className="page__path--page SmallText">
          {location[0]}
        </Link>
        <img
          alt="arrowTop"
          src="./img/arrowRight.svg"
          className="page__path--prev"
        />
        <span className="page__path--page SmallText">{location[1]}</span>
      </div>
      <div>
        <button
          type="button"
          className="page__path--back SmallText"
          onClick={() => navigate(-2)}
          data-cy="backButton"
        >
          <img
            width={24}
            height={24}
            alt="arrowBack"
            src="./img/arrowLeft.svg"
            className="page__path--prev"
          />
          Back
        </button>
      </div>
      {product && !downloadError && <Details product={product} />}
      {!product && !downloadError && <Loader />}
      {downloadError && (<h1 className="page__title h1">Product not Found</h1>)}
    </div>
  );
};
