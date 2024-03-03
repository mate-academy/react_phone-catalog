/* eslint-disable */
import { useParams } from 'react-router-dom';
import { NoResults } from '../../pages/NoResults/NoResults';
import { PaginationSlider } from '../../pagination/PaginationSlider';
import './ProductCard.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import { ColorCircleElement } from './ColorCircleElement';
import { CapacityChoiceElement } from './CapacityChoiceElement';
import { StateContext } from '../../AppContext';
import { ACTIONS, getFavourite } from '../../helpers/utils';
import { Product } from '../../types';
import { TechSpecParagraph } from './TechSpecParagraph';

export const ProductCard: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState('yellow');
  const [selectedCapacity, setSelectedCapacity] = useState('64 GB');
  const { productId } = useParams<string>();
  const topPageRef = useRef<null | HTMLDivElement>(null);

  const [product, setProduct] = useState<Product>();
  const [bigPic, setBigPic] = useState('');

  const { state, dispatch } = useContext(StateContext);

  const [picSet, setPicSet] = useState<string[]>([]);
  const [about, setAbout] = useState<string[]>([])

  useEffect(() => {
    if (productId) {
      setProduct(state.products.find(phone => phone.id === +productId) as Product);
      if (product) {
        setPicSet(product.picsArray);
        setAbout(product.description.split('/'));
      }
    }
    setSelectedColor('yellow');
  }, [state.products, productId, product?.description])

  useEffect(() => {
    getPics(selectedColor)
    if (topPageRef.current) {
      topPageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [topPageRef.current, product, selectedColor]);

  useEffect(() => {
    setBigPic(picSet[0]);
  }, [picSet, topPageRef.current, product, selectedColor])

  if (product === undefined) {
    return <NoResults />;
  }

  const addToFavourites = () => {
    if (!getFavourite(state.favourites, product)) {
      dispatch({ type: ACTIONS.SET_FAVOUTITES, payload: product });
    } else {
      dispatch({ type: ACTIONS.DELETE_FROM_FAVOURITES, payload: product });
    }
  }

  const addToCart = () => {
    if (!getFavourite(state.card, product)) {
      dispatch({ type: ACTIONS.ADD_TO_CARD, payload: product });
    } else {
      dispatch({ type: ACTIONS.DELETE_FROM_CARD, payload: product });
    }
  }

  function getPics(color: string) {
    if (product) {
      switch (color) {
        case 'yellow':
          setPicSet(product.picsArray);
          break;
        case 'green':
          if (product.picsArray2) {
            setPicSet(product.picsArray2);
          }
          break;
        case 'brown':
          if (product.picsArray3) {
            setPicSet(product.picsArray3);
          }
          break;
        case 'grey':
          if (product.picsArray4) {
            setPicSet(product.picsArray4);
          }
          break;
        default:
          setPicSet(product.picsArray);
          break;
      }
    }

  }

  return (
    <div className="">
      <div>
        <div className="font-header" ref={topPageRef}>
          {product?.name}
        </div>

        <div className="upper-block mb-80" style={{ justifyContent: 'space-between' }}>

          <div className="pictures-block">

            <div className="picture-column">

              {picSet.map(pic => {
                return (
                  <div
                    className="small-picbox"
                    onClick={() => setBigPic(pic)}
                    key={uuidv4()}
                  >
                    <img src={pic} alt="img" className="small-pic" />
                  </div>
                );
              })}

            </div>
            <div className="big-picture-box">
              <img src={bigPic} alt="img" className="big-picture" />
            </div>

          </div>

          <div className="dflexcolumn tech-specs" >
            <div className="dflex space-between grey id-text ">
              <div className="" >
                <div className="mb-8">
                  Avalaible colors
                </div>
                <div className="dflex mb-24">

                  < ColorCircleElement
                    id="yellow"
                    onClick={setSelectedColor}
                    color='#fcdbc1'
                    selectedColor={selectedColor}
                  />

                  < ColorCircleElement
                    id="green"
                    color='#5f7170'
                    onClick={setSelectedColor}
                    selectedColor={selectedColor}
                  />

                  < ColorCircleElement
                    id="brown"
                    color='#4c4c4c'
                    onClick={setSelectedColor}
                    selectedColor={selectedColor}
                  />

                  < ColorCircleElement
                    id="grey"
                    color='#f0f0f0'
                    onClick={setSelectedColor}
                    selectedColor={selectedColor}
                  />

                </div>
                <div className="grey-line mb-24"></div>
                <div className="mb-8">
                  Select capacity
                </div>
                <div className="capacity-box dflex mb-24">

                  <CapacityChoiceElement
                    capacity="64 GB"
                    onClick={setSelectedCapacity}
                    selectedCapacity={selectedCapacity}
                  />
                  <CapacityChoiceElement
                    capacity="256 GB"
                    onClick={setSelectedCapacity}
                    selectedCapacity={selectedCapacity}
                  />
                  <CapacityChoiceElement
                    capacity="512 GB"
                    onClick={setSelectedCapacity}
                    selectedCapacity={selectedCapacity}
                  />

                </div>
                <div className="grey-line mb-32"></div>

                <div className="upper-box-text mb-16">
                  <div className="dflex">
                    <div className="product-card-price mr-8">{product?.price}</div>
                    <div className="done grey font22">{product?.price}</div>

                  </div>
                </div>

                <div className="dflex mb-32" style={{ justifyContent: 'space-between' }}>
                  <div
                    className={classNames("button-add-to-card mr-8", {
                      "button-added": getFavourite(state.card, product),
                    })}
                    onClick={addToCart}
                    data-cy="addToFavorite"
                  >
                    {getFavourite(state.card, product) ? 'Added to card' : 'Add to card'}
                  </div>
                  <div>
                    <div
                      className="favourite cp"
                      onClick={addToFavourites}
                    >
                      {getFavourite(state.favourites, product) ? (
                        <img
                          src="./img/icons/red.svg"
                          alt="img"
                        />
                      ) : (
                        <img
                          src="./img/icons//icon_1.svg"
                          alt="img"
                        />
                      )}

                    </div>
                  </div>
                </div>

                <div className="tech-details-block">

                  <TechSpecParagraph fieldName='Screen' fieldDescription={product?.screen} />

                  <TechSpecParagraph fieldName='Resolution' fieldDescription={product?.screenResolution} />

                  <TechSpecParagraph fieldName='Processor' fieldDescription={product?.processor} />

                  <TechSpecParagraph fieldName='RAM' fieldDescription={product?.ram} />

                </div>

              </div>
              <div>ID: {product?.id}</div>
            </div>

          </div>

        </div>

        <div className="lower-block dflex mb-80" style={{ justifyContent: 'space-between' }}>
          <div className="about" data-cy="productDescription">
            <div className="about-header mb-16">About</div>
            <div className="grey-line mb-32"></div>
            <div className="header-small">{about[0]}</div>
            <p className="grey-text">{about[1]}</p>
            <p className="grey-text">{about[2]}</p>
            <div className="header-small">{about[3]}</div>
            <p className="grey-text">{about[4]}</p>
            <div className="header-small">{about[5]}</div>
            <p className="grey-text" style={{ marginBottom: 0 }}>{about[6]}</p>

          </div>

          <div className="tech-specs">
            <div className="about-header mb-16">Tech specs</div>
            <div className="grey-line mb-32"></div>
            <div className="tech-details-block grey">

              <TechSpecParagraph fieldName='Screen' fieldDescription={product?.screen} />

              <TechSpecParagraph fieldName='Resolution' fieldDescription={product?.screenResolution} />

              <TechSpecParagraph fieldName='Processor' fieldDescription={product?.processor} />

              <TechSpecParagraph fieldName='RAM' fieldDescription={product?.ram} />

              <TechSpecParagraph fieldName='Buit in memory' fieldDescription={product?.builtInMemory} />

              <TechSpecParagraph fieldName='Camera' fieldDescription={product?.camera} />

              <TechSpecParagraph fieldName='Zoom' fieldDescription={product?.zoom} />

              <TechSpecParagraph fieldName='Cell' fieldDescription={product?.cell} />

            </div>
          </div>
        </div>

      </div>

      <PaginationSlider pageName="suggested" headline="You may also like" />
    </div>
  );
};
