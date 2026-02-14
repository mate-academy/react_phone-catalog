import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import style from './Product-description.module.scss';

interface DescriptionItem {
  title: string;
  text: string[];
}

interface ProductProps {
  productScreen: string;
  productRam: string;
  productProcessor: string;
  productResolution: string;
  capacity: string[];
}

export const ProductDescription = ({
  productScreen,
  productRam,
  productProcessor,
  productResolution,
  capacity,
}: ProductProps) => {
  const { productId } = useParams<{ productId: string }>();
  const [description, setDescription] = useState<DescriptionItem[]>([]);
  const [camera, setCamera] = useState();
  const [zoom, setZoom] = useState();
  const [cell, setCell] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (productId) {
      let url = '';
      if (location.pathname.includes('/phones')) {
        url = './api/phones.json';
      } else if (location.pathname.includes('/tablets')) {
        url = './api/tablets.json';
      } else if (location.pathname.includes('/accessories')) {
        url = './api/accessories.json';
      }

      if (url) {
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            const product = data.find((item: any) => item.id === productId);
            if (product) {
              setDescription(product.description);
              setCamera(product.camera);
              setZoom(product.zoom);
              setCell(product.cell[0]);
            }
          });
      }
    }
  }, [productId, location.pathname]);

  return (
    <section className={`${style.description} ${style['description--margin']}`}>
      <div className={style.description__product}>
        <h2 className={style.description__product__title}>About</h2>
        <hr className={style.description__product__line} />
        {description.map((item: DescriptionItem, index: number) => (
          <div key={index}>
            <h3 className={style.description__product__title}>{item.title}</h3>
            {item.text.map((paragraph, pIndex) => (
              <p key={pIndex} className={style.description__product__text}>
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className={style.description__info}>
        <h2 className={style.description__info__title}>Tech specs</h2>
        <hr className={style.description__info__line} />

        <div className={style.description__info__about}>
          <p className={style.description__info__about__parametr}>Screen</p>
          <p className={style.description__info__about__number}>
            {productScreen}
          </p>
        </div>

        <div className={style.description__info__about}>
          <p className={style.description__info__about__parametr}>Resolution</p>
          <p className={style.description__info__about__number}>
            {productResolution}
          </p>
        </div>

        <div className={style.description__info__about}>
          <p className={style.description__info__about__parametr}>Processor</p>
          <p className={style.description__info__about__number}>
            {productProcessor}
          </p>
        </div>

        <div className={style.description__info__about}>
          <p className={style.description__info__about__parametr}>RAM</p>
          <p className={style.description__info__about__number}>{productRam}</p>
        </div>

        <div className={style.description__info__about}>
          <p className={style.description__info__about__parametr}>
            Built in memory
          </p>
          <p className={style.description__info__about__number}>
            {capacity[0]}
          </p>
        </div>

        <div className={style.description__info__about}>
          <p className={style.description__info__about__parametr}>Camera</p>
          <p className={style.description__info__about__number}>{camera}</p>
        </div>

        <div className={style.description__info__about}>
          <p className={style.description__info__about__parametr}>Zoom</p>
          <p className={style.description__info__about__number}>{zoom}</p>
        </div>

        <div className={style.description__info__about}>
          <p className={style.description__info__about__parametr}>Cell</p>
          <p className={style.description__info__about__number}>{cell}</p>
        </div>
      </div>
    </section>
  );
};