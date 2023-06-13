import React, { useEffect, useState } from 'react';
import './productDetailsPage.scss';
import { useParams } from 'react-router-dom';
import BigImg from '../../images/productDetails/bigImg.png';
import SmallImg1 from '../../images/productDetails/imageSmall_1.png';
import SmallImg2 from '../../images/productDetails/imageSmall_2.png';
import SmallImg3 from '../../images/productDetails/imageSmall_3.png';
import { getProductDetails } from '../api/data';
import { ProductDetailsType } from '../types/ProductDetailsType';

export const ProductDetailsPage = () => {
//   const [productDetails, setProductDetails] = useState<ProductDetailsType>()

  //   const params = useParams();
  // const getDetails = async () => {
  //   const productDetails = await getProductDetails('1')
  //   setProductDetails(productDetails)
  // };

  // useEffect(() => {
  // getDetails()
  // }, []);

  return (
    <>
      <section className="productDetails">
        <h1 className="productDetails__title">Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)</h1>
        <div className="productDetails__mainDetails">
          <div className="grid">
            <div className="productDetails__mainDetales__productID grid__item--desktop-23-24">ID: 802390</div>
            <div className="productDetails__mainDetales productDetails__mainDetales__imagesContainer grid__item--desktop-1-12">
              <div className="productDetails__mainDetales__imageSidebar grid__item--desktop-1-2">
                <img src={SmallImg1} alt="" className="productDetails__mainDetales__imageSidebar__smallImage" />
                <img src={SmallImg2} alt="" className="productDetails__mainDetales__imageSidebar__smallImage" />
                <img src={SmallImg3} alt="" className="productDetails__mainDetales__imageSidebar__smallImage" />
              </div>

              <div className="productDetails__mainDetales__mainImage grid__item--desktop-4-11">
                <img src={BigImg} alt="" />
              </div>
            </div>

            <div className="productDetails__mainDetales__options grid__item--desktop-14-20">
              <div className="productDetails__mainDetales__options__colors">
                <p className="productDetails__mainDetales__options__colors__title">Available colors</p>
                <div className="productDetails__mainDetales__options__colors__container">
                  <div className="productDetails__mainDetales__options__colors__container__circle productDetails__mainDetales__options__colors__container__circle--1" />
                  <span className="productDetails__mainDetales__options__colors__container__circle productDetails__mainDetales__options__colors__container__circle--2" />
                  <span className="productDetails__mainDetales__options__colors__container__circle productDetails__mainDetales__options__colors__container__circle--3" />
                  <span className="productDetails__mainDetales__options__colors__container__circle productDetails__mainDetales__options__colors__container__circle--4" />
                </div>
              </div>

              <div className="productDetails__mainDetales__options__capacity">
                <p className="productDetails__mainDetales__options__capacity__title">Select capacity</p>

                <div className="productDetails__mainDetales__options__capacity__itemContainer">
                  <div className="productDetails__mainDetales__options__capacity__item">64 GB</div>
                  <div className="productDetails__mainDetales__options__capacity__item">256 GB</div>
                  <div className="productDetails__mainDetales__options__capacity__item">512 GB</div>
                </div>

              </div>

              <div className="productDetails__mainDetales__options__buyBlock">
                <div className="productDetails__mainDetales__options__buyBlock__price">
                  <h2 className="productDetails__mainDetales__options__buyBlock__price__full">$1099</h2>
                  <h2 className="productDetails__mainDetales__options__buyBlock__price__discont">$1199</h2>
                </div>
              </div>

              <div className="productDetails__mainDetales__options__btnContainer">
                <button className="productDetails__mainDetales__options__btnContainer__btn">Add to cart</button>

                <div className="productDetails__mainDetales__options__btnContainer__favoritesBtn">

                  <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="productDetails__mainDetales__options__btnContainer__favoritesImg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631367C10.1584 0.411794 10.7264 0.298779 11.3 0.298779C11.8737 0.298779 12.4416 0.411794 12.9716 0.631367C13.5015 0.850941 13.983 1.17277 14.3885 1.57847C14.7941 1.98393 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66666C15.6679 5.24027 15.5549 5.80826 15.3353 6.33819C15.1158 6.86806 14.794 7.34948 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.825 0.33252 4.66666C0.33252 3.50832 0.792668 2.39742 1.61174 1.57835C2.43081 0.759284 3.54171 0.299135 4.70005 0.299135C5.85839 0.299135 6.96928 0.759284 7.78835 1.57835L8.00005 1.79005L8.21162 1.57847C8.21158 1.57851 8.21166 1.57843 8.21162 1.57847C8.61711 1.17283 9.09865 0.85092 9.62852 0.631367ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07391 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07391 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.5683C6.24189 2.01178 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01178 2.60169 2.5683C2.04517 3.12482 1.73252 3.87962 1.73252 4.66666C1.73252 5.4537 2.04517 6.2085 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48952 13.8928 6.1623 14.042 5.80228C14.1911 5.44225 14.2679 5.05637 14.2679 4.66666C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17102 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                  </svg>
                </div>
              </div>

              <div className="productDetails__mainDetales__options__characteristics">
                <div className="productDetails__mainDetales__options__characteristics__items">
                  <div className="productDetails__mainDetales__options__characteristics__item">Screen</div>
                  <div className="productDetails__mainDetales__options__characteristics__item">Resolution</div>
                  <div className="productDetails__mainDetales__options__characteristics__item">Processor</div>
                  <div className="productDetails__mainDetales__options__characteristics__item">RAM</div>
                </div>

                <div className="productDetails__mainDetales__options__characteristics__values">
                  <div className="productDetails__mainDetales__options__characteristics__value">6.5” OLED</div>
                  <div className="productDetails__mainDetales__options__characteristics__value">2688x1242</div>
                  <div className="productDetails__mainDetales__options__characteristics__value">Apple A12 Bionic</div>
                  <div className="productDetails__mainDetales__options__characteristics__value">3 GB</div>
                </div>
              </div>

            </div>

            {/* <div className='productDetails__additionalDetails grid__item--desktop-1-20'> */}
            <div className="productDetails__additionalDetails__about grid__item--desktop-1-12">
              <h1 className="productDetails__additionalDetails__about__title">About</h1>
              <h2 className="productDetails__additionalDetails__about__paragraphName">And then there was Pro</h2>
              <p className="productDetails__additionalDetails__about__paragraph">
                A transformative triple‑camera system that adds tons of capability without complexity.

                An unprecedented leap in battery life. And a mind‑blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.
              </p>
              <h2 className="productDetails__additionalDetails__about__paragraphName">Camera</h2>
              <p className="productDetails__additionalDetails__about__paragraph">
                Meet the first triple‑camera system to combine cutting‑edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest‑quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.
              </p>
              <h2 className="productDetails__additionalDetails__about__paragraphName">Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.</h2>
              <p className="productDetails__additionalDetails__about__paragraph">
                iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.
              </p>
            </div>

            <div className="productDetails__additionalDetails__specs grid__item--desktop-14-24">
              <h1 className="productDetails__additionalDetails__specs__title">About</h1>
              <div className="productDetails__additionalDetails__specs__tech">
                <div className="productDetails__additionalDetails__specs__items">
                  <div className="productDetails__additionalDetails__specs__item">Screen</div>
                  <div className="productDetails__additionalDetails__specs__item">Resolution</div>
                  <div className="productDetails__additionalDetails__specs__item">Processor</div>
                  <div className="productDetails__additionalDetails__specs__item">RAM</div>
                  <div className="productDetails__additionalDetails__specs__item">Built in memory</div>
                  <div className="productDetails__additionalDetails__specs__item">Camera</div>
                  <div className="productDetails__additionalDetails__specs__item">Zoom</div>
                  <div className="productDetails__additionalDetails__specs__item">Cell</div>
                </div>

                <div className="productDetails__additionalDetails__specs__values">
                  <div className="productDetails__additionalDetails__specs__value">6.5” OLED</div>
                  <div className="productDetails__additionalDetails__specs__value">2688x1242</div>
                  <div className="productDetails__additionalDetails__specs__value">Apple A12 Bionic</div>
                  <div className="productDetails__additionalDetails__specs__value">3 GB</div>
                  <div className="productDetails__additionalDetails__specs__value">64 GB</div>
                  <div className="productDetails__additionalDetails__specs__value">12 Mp + 12 Mp + 12 Mp (Triple)</div>
                  <div className="productDetails__additionalDetails__specs__value">Optical, 2x</div>
                  <div className="productDetails__additionalDetails__specs__value">GSM, LTE, UMTS</div>
                </div>
              </div>

            </div>
            {/*
            </div> */}

          </div>

        </div>

        {/* add component carusel */}
      </section>

    </>

  );
};
