/* eslint-disable */
import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
import {
  // phoneArray,
  newPhoneArray,
} from '../../assets/arrayOfPhones/phonesArray';
import { Phone } from './PhoneItem';
import { PageNotFound } from '../../pages/NotFound/PageNotFound';
import { PaginationSlider } from '../../pagination/PaginationSlider';
import './ProductCard.scss';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
// import classNames from 'classnames';
import { ColorCircleElement } from './ColorCircleElement';
import { CapacityChoiceElement } from './CapacityChoiceElement';
import { TechSpecParagraph } from './TechSpecParagraph';

type CustomArray = [
  string,
  string,
];

export const ProductCard: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState('yellow');
  const [selectedCapacity, setSelectedCapacity] = useState('64 GB');
  const { phoneId } = useParams<string>();
  const topPageRef = useRef<null | HTMLDivElement>(null);


  let findThePhone = {} as Phone || undefined;




  if (phoneId) {
    findThePhone = newPhoneArray.find(phone => phone.id === +phoneId) as Phone;
  }

  if (findThePhone === undefined) {
    return <PageNotFound />;
  }

  // const picsUrls = findThePhone.picsArray;
  const [bigPic, setBigPic] = useState('');
  const techSp = findThePhone.tehcSpecs.split('/');
  const techSpChunk = techSp.slice(0, 8);
  const about = findThePhone.textAbout.split('/');
  const empty: CustomArray[] = getRightArray(techSpChunk);
  const emptyBig: Array<Array<string>> = getRightArray(techSp);
  const [picSet, setPicSet] = useState<string[]>(findThePhone.picsArray);
  const [test, setTest] = useState(false)
  console.log(picSet, selectedColor, findThePhone, 'picset');

  function getPics(color: string) {
    switch (color) {
      case 'yellow':
        setPicSet(findThePhone.picsArray);
        break;
      case 'green':
        if (findThePhone.picsArray2) {
          setPicSet(findThePhone.picsArray2);
        }
        break;
      case 'brown':
        if (findThePhone.picsArray3) {
          setPicSet(findThePhone.picsArray3);
        }
        break;
      case 'grey':
        if (findThePhone.picsArray4) {
          setPicSet(findThePhone.picsArray4);
        }
        break;
      default:
        setPicSet(findThePhone.picsArray);
        break;
    }
  }

  useEffect(() => {
    setSelectedColor('yellow')
  }, [findThePhone.id])

  useEffect(() => {
    getPics(selectedColor)
    // setBigPic(picSet[0])
    if (topPageRef.current) {
      topPageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [topPageRef.current, findThePhone.id, selectedColor]);

  useEffect(() => {
    setBigPic(picSet[0])
  }, [picSet, topPageRef.current, findThePhone.name, selectedColor])

  function getRightArray(array1: string[]) {
    const empty: Array<Array<string>> = [];
    for (let i = 0; i <= array1.length - 1; i += 2) {
      const temp: any = [];
      temp.push(array1[i])
      temp.push(array1[i + 1])
      empty.push(temp);
    }
    return empty as CustomArray[];
  }

  const addToFavourites = () => {
    // findThePhone.like = true;
    setTest(!test);
  }

  console.log(test, 'card page test');
  
  return (
    <div className="">
      <div>
        <div className="font-header" ref={topPageRef}>
          {findThePhone.name}
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
                    <div className="product-card-price mr-8">{findThePhone.priceDiscount}</div>
                    <div className="done grey font22">{findThePhone.priceFull}</div>

                  </div>
                </div>

                <div className="dflex mb-32" style={{ justifyContent: 'space-between' }}>
                  <div className="button-add-to-card mr-8">Add to card</div>
                  <div>
                    <div
                      className="favourite cp"
                      onClick={addToFavourites}
                    >
                      <img
                        src="./img/icons/icon_1.svg"
                        alt="img"
                        className="favourite-img"
                      />
                    </div>
                  </div>
                </div>

                <div className="tech-details-block">

                  {empty.map((chunk) => {
                    if (chunk) {
                      const key = uuidv4();
                      return (
                        <TechSpecParagraph
                          text1={chunk[0]}
                          text2={chunk[1]}
                          key={key}
                        />)
                    }
                    return (
                      <div></div>
                    )
                  })}

                </div>

              </div>
              <div>ID: {findThePhone.id}</div>
            </div>

          </div>

        </div>

        <div className="lower-block dflex mb-80" style={{ justifyContent: 'space-between' }}>
          <div className="about">
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

              {emptyBig.map((chunk) => {
                if (chunk.length) {
                  const key = uuidv4();
                  return (
                    <TechSpecParagraph
                      text1={chunk[0]}
                      text2={chunk[1]}
                      key={key}
                    />)
                }
                return (
                  <div></div>
                )
              })}

            </div>
          </div>
        </div>

      </div>

      <PaginationSlider pageName="suggested" />
    </div>
  );
};
