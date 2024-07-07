import { Link, useParams } from 'react-router-dom';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import './ProductDetailsPage.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { Product } from '../../types/Product';
import { useEffect, useState } from 'react';
import { getAccessories, getPhones, getTablets } from '../../services/products';

export const ProductDetailsPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const [product, setProduct] = useState<Product | null>(null);
  const { productId } = useParams<{ productId: string }>();
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedCapacity, setSelectedCapacity] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      const phones = await getPhones();
      const tablets = await getTablets();
      const accessories = await getAccessories();

      const allProducts = [...phones, ...tablets, ...accessories];
      const foundProduct = allProducts.find(item => item.id === productId);

      setProduct(foundProduct || null);
      if (foundProduct && foundProduct.images && !!foundProduct.images.length) {
        setSelectedImage(foundProduct.images[0]);
      }

      if (
        foundProduct &&
        foundProduct.colorsAvailable &&
        !!foundProduct.colorsAvailable
      ) {
        setSelectedColor(foundProduct.colorsAvailable[0]);
      }

      if (
        foundProduct &&
        foundProduct.capacityAvailable &&
        !!foundProduct.capacityAvailable
      ) {
        setSelectedCapacity(foundProduct.capacityAvailable[0]);
      }
    }

    fetchData();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const {
    name,
    category,
    images,
    colorsAvailable,
    capacityAvailable,
    priceRegular,
    priceDiscount,
    screen,
    resolution,
    processor,
    ram,
    description,
    camera,
    zoom,
    cell,
  } = product;

  return (
    <>
      <Header />
      <div className="container">
        <div className="product-details">
          <div className="product-details__active">
            <Link to="/" className="product-details__active--link">
              <svg className="icon icon-home">
                <use href="/img/icons.svg#icon-home"></use>
              </svg>
            </Link>
            <div className="product-details__active--arrow">
              <svg className="icon icon-arrow-right">
                <use href="/img/icons.svg#icon-arrow-right"></use>
              </svg>
            </div>
            <Link to={`/${category}`} className="product-details__active--cat">
              {category}
            </Link>
            <div className="product-details__active--arrow">
              <svg className="icon icon-arrow-right">
                <use href="/img/icons.svg#icon-arrow-right"></use>
              </svg>
            </div>
            <Link
              to={`/${category}/${productId}`}
              className="product-details__active--name"
            >
              {name}
            </Link>
          </div>

          <div className="product-details__back">
            <div className="product-details__back--arrow">
              <svg className="icon icon-arrow-left">
                <use href="/img/icons.svg#icon-arrow-left"></use>
              </svg>
            </div>
            <Link to=".." className="product-details__back--text">
              Back
            </Link>
          </div>
          <h2 className="product-details__title">{name}</h2>
          <div className="product-details__swiper">
            <div className="product-details__swiper--big-pict swiper-pict">
              <img
                src={selectedImage}
                className="swiper-pict__large-image"
                alt={name}
              />
            </div>
            <Swiper
              spaceBetween={10}
              slidesPerView={5}
              className="product-details__swiper--wrapper"
            >
              {images.map((image, index) => (
                <SwiperSlide
                  key={index}
                  className="product-details__swiper--img"
                >
                  <img
                    src={image}
                    onClick={() => setSelectedImage(image)}
                    className={
                      selectedImage === image ? 'selected-thumbnail' : ''
                    }
                    alt={`Thumbnail ${index + 1}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="product-details__colors">
            <div className="product-details__colors--box colors-box">
              <p className="colors-box__title">Available colors</p>
              <p className="colors-box__id">ID: 802390</p>
            </div>
            <div className="product-details__colors--cont colors-cont">
              {colorsAvailable.map((color: string, index: number) => (
                <div
                  key={index}
                  className={`colors-cont__color ${selectedColor === color ? 'selected' : ''}`}
                  style={{
                    backgroundColor:
                      selectedColor === color ? color : '#3B3E4A',
                  }}
                  onClick={() => setSelectedColor(color)}
                >
                  <div
                    className="colors-cont__color--in"
                    style={{ backgroundColor: color }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
          <div className="product-details__capacity">
            <p className="product-details__capacity--title">Select capacity</p>
            <div className="product-details__capacity--box capacity-box">
              {capacityAvailable.map((cap: string, index: number) => (
                <div
                  key={index}
                  className={`capacity-box__mem ${selectedCapacity === cap ? 'cap-selected' : ''}`}
                  onClick={() => setSelectedCapacity(cap)}
                >
                  {cap}
                </div>
              ))}
            </div>
          </div>
          <div className="product-details__price">
            <p className="product-details__price--disc">{`$${priceDiscount}`}</p>
            <p className="product-details__price--regular">{`$${priceRegular}`}</p>
          </div>
          <div className="product-details__buttons">
            <button type="button" className="product-details__buttons--add">
              Add to cart
            </button>
            <button className="product-details__buttons--heart">
              <svg className="icon icon-heart icon-heart-red">
                <use href="/img/icons.svg#icon-favourites-filled"></use>
              </svg>
            </button>
          </div>
          <ul className="product-details__tech">
            <li className="product-details__tech--item tech-item">
              <p className="tech-item__name">Screen</p>
              <p className="tech-item__param">{screen}</p>
            </li>
            <li className="product-details__tech--item tech-item">
              <p className="tech-item__name">Resolution</p>
              <p className="tech-item__param">{resolution}</p>
            </li>
            <li className="product-details__tech--item tech-item">
              <p className="tech-item__name">Processor</p>
              <p className="tech-item__param">{processor}</p>
            </li>
            <li className="product-details__tech--item tech-item">
              <p className="tech-item__name">RAM</p>
              <p className="tech-item__param">{ram}</p>
            </li>
          </ul>
          <div className="product-details__description">
            <h3 className="product-details__description--title">About</h3>
            {description.map((section, index) => (
              <div
                key={index}
                className="product-details__description--sect descr-sect"
              >
                <p className="descr-sect__subtitle">{section.title}</p>
                {section.text.map((paragraph, pIndex) => (
                  <p className="descr-sect__text" key={pIndex}>
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <div className="product-details__tech-specs">
            <h3 className="product-details__tech-specs--title">Tech specs</h3>
            <ul className="product-details__tech-specs--list">
              <li className="tech-specs-item">
                <p className="tech-specs-item__name">Screen</p>
                <p className="tech-specs-item__param">{screen}</p>
              </li>
              <li className="tech-specs-item">
                <p className="tech-specs-item__name">Resolution</p>
                <p className="tech-specs-item__param">{resolution}</p>
              </li>
              <li className="tech-specs-item">
                <p className="tech-specs-item__name">Processor</p>
                <p className="tech-specs-item__param">{processor}</p>
              </li>
              <li className="tech-specs-item">
                <p className="tech-specs-item__name">RAM</p>
                <p className="tech-specs-item__param">{ram}</p>
              </li>
              <li className="tech-specs-item">
                <p className="tech-specs-item__name">Camera</p>
                <p className="tech-specs-item__param">{camera}</p>
              </li>
              <li className="tech-specs-item">
                <p className="tech-specs-item__name">Zoom</p>
                <p className="tech-specs-item__param">{zoom}</p>
              </li>
              <li className="tech-specs-item">
                <p className="tech-specs-item__name">Cell</p>
                <p className="tech-specs-item__param">{`${cell[0]}, ${cell[1]}, ${cell[2]}`}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
