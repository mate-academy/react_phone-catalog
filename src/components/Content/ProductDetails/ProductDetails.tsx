import {useEffect, useMemo, useState} from 'react';
import {IoIosArrowBack} from 'react-icons/io';
import {Link} from 'react-router-dom';

import {Details} from '../../../type/Details';
import {DetailsSlideFoto} from '../DetailsSlideFoto';
import {TechSpecs} from './TechSpecs';
import {About} from './About';
import {Options} from './Options';
import {getProducts} from '../../../api';
import {Products} from '../../../type/Productes';
import {ProductsSlider} from '../ProductsSlider';

import style from './ProductDetails.module.scss';
import {Breadcrumb} from '../Breadcrumb';

type Props = {
  backUrl: string;
  details: Details;
  path: string[];
};

export const ProductDetails: React.FC<Props> = ({backUrl, details, path}) => {
  const [selectColor, setSelectColor] = useState<string | null>(null);
  const [selectCapacity, setSelectCapacity] = useState<string | null>(null);
  const [recommendationIndex, setRecommendationIndex] = useState(0);
  const [recommendations, setRecommendations] = useState<Products[]>([]);
  const [recommendationError, setRecommendationError] = useState(false);

  useEffect(() => {
    setRecommendationIndex(0);
    setRecommendationError(false);
    getProducts()
      .then(data => {
        setSelectColor(details.color);
        setSelectCapacity(details.capacity);
        setRecommendations(
          data.filter(product => product.itemId !== details?.id),
        );
      })
      .catch(() => setRecommendationError(true));
  }, [details]);

  const visibleRecommendations = useMemo(
    () => recommendations.slice(recommendationIndex, recommendationIndex + 4),
    [recommendationIndex, recommendations],
  );

  const handleNewClick = (click: string) => {
    setRecommendationIndex(previousIndex => {
      if (click === 'back') {
        return Math.max(0, previousIndex - 1);
      }

      const lastStartIndex = Math.max(0, recommendations.length - 4);
      return Math.min(lastStartIndex, previousIndex + 1);
    });
  };

  return (
    <div className={style.productDetails}>
      <Breadcrumb path={path} />
      <Link to={`../${backUrl}`} className={style.productDetails__back}>
        <IoIosArrowBack className={`${style.productDetails__back_arrow}`} />
        Back
      </Link>
      <h1 className={style.productDetails__title}>{details?.name}</h1>
      <div className={style.productDetails__content}>
        <div className={style.productDetails__content_colomn1}>
          {details && <DetailsSlideFoto details={details} />}
        </div>
        <div className={style.productDetails__content_colomn2}>
          <Options
            details={details}
            selectColor={selectColor}
            setSelectColor={setSelectColor}
            selectCapacity={selectCapacity}
            setSelectCapacity={setSelectCapacity}
          />
        </div>
      </div>

      <div className={style.productDetails__content}>
        <div className={style.productDetails__content_colomn1}>
          <About />
        </div>
        <div className={style.productDetails__content_colomn2}>
          <TechSpecs details={details} />
        </div>
      </div>

      {recommendationError ? (
        <p role="alert">Recommendations are temporarily unavailable.</p>
      ) : (
        <ProductsSlider
          produkts={visibleRecommendations}
          title="You may also like"
          handleClick={handleNewClick}
          canGoBack={recommendationIndex > 0}
          canGoForward={recommendationIndex < recommendations.length - 4}
        />
      )}
    </div>
  );
};
