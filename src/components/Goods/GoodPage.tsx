import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './GoodsList.scss';
import { getGoodDetail } from '../../helpers';

export const GoodPage = () => {
  const { good } = useParams();

  const [goodDetail, setGoodDetail] = useState<GoodDetail>();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const loadGoodDetail = async (goodId: string) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const data = await getGoodDetail(goodId);

      setGoodDetail(data);
      setIsLoaded(true);
    } catch (error) {
      setErrorMessage(String(error));
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadGoodDetail(good);
  }, [good]);

  const handleImages = (e: React.MouseEvent<HTMLElement>, i: number) => {
    e.preventDefault();
    setActiveImageIndex(i);
  };

  return (
    <section className="section">
      {errorMessage && <div>{errorMessage}</div>}
      {isLoading && isLoaded && ''}
      {goodDetail && (
        <article className="GoodPage">
          <h1 className="GoodPage__Heading">{goodDetail.name}</h1>
          <div className="GoodPage__Content">
            <div className="GoodPage__Column">
              <section className="GoodPage__Images">
                <ul className="GoodPage__ImageList">
                  {goodDetail.images.map((image, i) => (
                    <li
                      className="GoodPage__ImageItem"
                      key={image}
                    >
                      <a href="./#" onClick={e => handleImages(e, i)}>
                        <img
                          src={image}
                          alt={goodDetail.name}
                          className="GoodPage__Image"
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
              <section className="GoodPage__Description">
                {goodDetail.description}
              </section>
            </div>
            <div className="GoodPage__Column"></div>
          </div>
        </article>
      )}
    </section>
  );
};
