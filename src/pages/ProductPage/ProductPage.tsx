import React, { useState, useEffect } from 'react';
import { getGoodDetails } from './../../helpers/api';
import { useParams, useHistory } from 'react-router-dom';
import { CardSlider } from  './../../components/CardSlider';
import { Button } from './../../components/common/Button/Button';

/*const initDetails = {
  id: '',
  name: '',
  images: [],
  description: '',
  hardware: {
    cpu:[],
  },
  display: {
    screenResolution: '',
  },
  camera: {
    primary: '',
    zoom: '',
  },
  connectivity: {
    cell: '',
  },
}*/

export const ProductPage = ({ goods }: { goods: Good[] }) => {
  const temporaryColors = ['black', 'beige', 'pink'];
  const [goodDetails, setGoodDetails] = useState<GoodDetails>()
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [goodData, setGoodData] = useState<Good>();
  const [recommendedGoods, setRecommendedGoods] = useState<Good[]>([]);
  const history = useHistory();
  const { goodId } = useParams();


  const loadGoodDetails = async (good: string) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const data = await getGoodDetails(good);
      const loadedGoodDetails = { ...data };
      setGoodDetails(loadedGoodDetails);
    } catch (error) {
      setErrorMessage(String(error));
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadGoodDetails(goodId);
  },[goodId])

  useEffect(() => {
    const matchedGoodData = goods.find(good => good.id === goodId);
    if (matchedGoodData) {
     loadGoodDetails(goodId);
     setGoodData(matchedGoodData);
     const filterName = matchedGoodData?.name.split(' ').splice(0, 1).toString();
     const similarGoods = goods.filter(good => good.name.includes(filterName||''));
     setRecommendedGoods(similarGoods);
    } else {
     history.push("/failed");
    }
 }, [goodId, history, goods]);


  console.log(isLoading);
  console.log(errorMessage);
  console.log(goodData);
  console.log(goodId);


  return (
    <section className="productpage">
      <h1 className="productpage__title">{goodDetails?.name}</h1>
      <div className="productpage__container">


        <section className="gallery">
          <div className="gallery__img-container">
            <ul className="gallery__img-list">
              {goodDetails?.images.map((image) => (
                <li className="gallery__img-item"
                  key={image}
                >
                  <a href="./#" >
                    <img
                      src={image}
                      alt={goodDetails.name}
                      className="gallery__img"
                    />
                  </a>
                </li>
              ))}
            </ul>

              <div className="gallery__main-img">
                <img
                  src={goodDetails?.images[0]}
                  alt={goodDetails?.name}
                  className="GoodPage__ImageBig"
                />
              </div>

          </div>
          </section>

        <section className="details">
          <div className="details-container">
              <div className="details__card">
                <span className="details__colors-title">
                  Available colors
                </span>
                <div className="details__colors">
                  <ul className="details__colors-list">
                    {temporaryColors.map(color => (
                      <li className="details__color-item">
                        <span
                            className="details__color"
                            style={{backgroundColor: color}}>
                        </span>
                      </li>
                    ))}
                  </ul>

                </div>
                <span className="details__capacity-title">
                  Select capacity
                </span>
                <div className="details__capacity">
                  <ul className="details__capacity-list">
                      <li className="details__capacity-item">
                        <span className="details__capacity-span">
                          {goodData?.capacity}
                        </span>
                      </li>
                    </ul>
                </div>


                <div className="details__price-container">
                  <span className="details__price">
                    {"$" + goodData?.price}
                  </span>
                </div>

                <div className="details__btn-container btn">
                  <Button classCSS={"btn__add-to-cart--primary"} title={'Add to cart'}  good={goodId} />
                  <Button classCSS={"btn__add-to-fav--primary"} title={''}   good={goodId}/>
                </div>

                <div className="details__feature">
                  <span className="details__feature-title">
                    Screen
                  </span>
                  <span className="details__feature-value">
                    {goodData?.screen}
                  </span>
                </div>
                <div className="details__feature">
                  <span className="details__feature-title">
                    Capacity
                  </span>
                  <span className="details__feature-value">
                    {goodData?.capacity}
                  </span>
                </div >
                <div className="details__feature">
                  <span className="details__feature-title">
                    RAM
                  </span>
                  <span className="details__feature-value">
                    {goodData?.ram}
                  </span>
                </div>
              </div>

                <div className="details__product-id">
                  <span className="details__product-id--current">
                    ID:
                    {' '}
                    {goodDetails && goodDetails.id.toUpperCase()}
                  </span>
                </div>
              </div>
      </section>



        <section className="about">
          <h2 className="about__title">About</h2>
          <article className="about__article">
            {goodDetails?.description}
          </article>
        </section>

      <section className="tech-specs">
        <h2 className="tech-specs__title">Tech specs</h2>

        <ul className="tech-specs__list">
          <li className="tech-specs__item">
            <span className="tech-specs__item-title">Screen</span>
            <span className="tech-specs__value">{goodData?.screen}</span>
          </li>
          <li className="tech-specs__item">
            <span className="tech-specs__item-title">Resolution</span>
            <span className="tech-specs__value">{goodDetails?.display.screenResolution}</span>
          </li>
          <li className="tech-specs__item">
            <span className="tech-specs__item-title">Processor</span>
            <span className="tech-specs__value">{goodDetails?.hardware.cpu}</span>
          </li>
          <li className="tech-specs__item">
            <span className="tech-specs__item-title">RAM</span>
            <span className="tech-specs__value">{goodData?.ram}</span>
          </li>
          <li className="tech-specs__item">
            <span className="tech-specs__item-title">Built in memory</span>
            <span className="tech-specs__value">{goodData?.capacity}</span>
          </li>
          <li className="tech-specs__item">
            <span className="tech-specs__item-title">Camera</span>
            <span className="tech-specs__value">{goodDetails?.camera.primary}</span>
          </li>
          <li className="tech-specs__item">
            <span className="tech-specs__item-title">Zoom</span>
            <span className="tech-specs__value"></span>
          </li>
          <li className="tech-specs__item">
            <span className="tech-specs__item-title">Cell</span>
            <span className="tech-specs__value">{goodDetails?.connectivity.cell}</span>
          </li>
        </ul>
      </section>
      </div>
      <CardSlider goods={recommendedGoods} title={`You may also like`} />
    </section>
  )
}
               /*





               {goodDetail.images.map((image, i) => (
                  <li
                    className={cn({
                      'gallery__img--current': i === activeImageIndex,
                    },
                    'gallery__img')}
                    key={image}
                  >
                    <a href="./#" onClick={e => handleImages(e, i)}>
                      <img
                        src={image}
                        alt={goodDetail.name}
                        className="productpage__img"
                      />
                    </a>
                  </li>
                ))}
              </ul>
              <img
                src={goodDetail.images[activeImageIndex]}
                alt={goodDetail.name}
                className="GoodPage__ImageBig"
              />
            </section>
          </div>
          <div className="GoodPage__Column">
            <span className="GoodPage__Id">
              ID:
              {' '}
              {goodInfo && goodInfo.id}
            </span>
            <section className="GoodPage__NarrowBlock">
              <div className="GoodPage__Price">
                <span className="GoodPage__Price--actual">
                  {price}
                </span>
                {(goodInfo && goodInfo.discount > 0) && (
                  <span className="GoodPage__Price--full">
                    {goodInfo.price}
                  </span>
                )}
              </div>
              <div className="productpage__btn">
                <div className="productpage__primary-btn">
                  <PrimaryButton
                    text={cart.some(prod => prod.id === match.params.good)
                      ? 'Remove from cart'
                      : 'Add to cart'}
                    selected={cart.some(prod => prod.id === match.params.good)}
                    id={match.params.good}
                  />
                </div>
                <div className="GoodPage__Buttons--favorites">
                  <label onClick={() => handleFavorites(good)}>
                    <Icon name={isFavorite(good) ? 'favorites-filled' : 'favorites'} border inActive={false} />
                  </label>
                </div>
              </div>
            </section>
            <section className="GoodPage__Info">
              <GoodTechInfo
                goodDetail={goodDetail}
                goodInfo={goodInfo}
              />
            </section>
          </div>

          <div className="GoodPage__Column">
            <section className="GoodPage__Description">
              <h2 className="GoodPage__SubHeading">About</h2>
              {goodInfo && goodInfo.snippet}
              <div className="GoodPage__MoreInfo">
                <h3 className="GoodPage__MoreInfo--SubHeading">More info</h3>
                {goodDetail && goodDetail.description}
              </div>
            </section>
          </div>

          <div className="GoodPage__Column">
            <section className="GoodPage__TechSpecs">
              <h2 className="GoodPage__SubHeading">Tech specs</h2>
              <ul>
                <GoodSpecsInfo
                  goodDetail={goodDetail}
                  goodInfo={goodInfo}
                />
              </ul>
            </section>
          </div>
        </div>
      </article>
    </section>
  )
}*/



