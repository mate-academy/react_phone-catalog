import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import NavMain from '../../components/NavMain/NavMain';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ButtonsAddToCart,
  ButtonsFavourites,
} from '../../components/Buttons/Button';
import { ButtonCapcity } from './components/ButtonCapacity';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import Image from './components/Image';
import { ProductDetails } from '../../types/ProductDetails';
import {
  getAllProudct,
  getColorAndCapacity,
  getProductDetails,
  getSuggestedProducts,
} from '../../helpers/helpers';
import { Product } from '../../types/Product';
import { uniqId } from '../../helpers/uniqId';
import { colorMap } from '../../utils/coloMap';
import Loader from '../../components/Loader/Loader';

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();

  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [product, setProduct] = useState<Product>();
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handleChange = async (color: string, capacity: string) => {
    if (!details || !details.category || !details.namespaceId) {
      return;
    }

    const newProduct = await getColorAndCapacity(
      details?.category,
      details?.namespaceId,
      color,
      capacity,
    );

    if (newProduct) {
      navigate(`/products/${newProduct}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const allProducts = await getAllProudct();
        const productFind = allProducts.find(item => item.itemId === productId);

        setProduct(productFind);

        const interestProduct: Product[] = await getSuggestedProducts();

        setSuggestedProducts(interestProduct);

        if (productId && productFind) {
          const detailsFind = await getProductDetails(
            productId,
            productFind?.category,
          );

          setDetails(detailsFind);
        } else {
          setDetails(null);
        }

        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchData();
    }
  }, [productId]);

  if (isLoading) {
    return <Loader />;
  }

  if (!details || !product) {
    return <div>Product was not found</div>;
  }

  return (
    <div className="details container">
      <NavMain
        category={
          details?.category
            ? details.category.charAt(0).toUpperCase() +
              details.category.slice(1)
            : ''
        }
      />

      <Link to="/phones" className="details__back">
        <ArrowLeft />
        Back
      </Link>

      <h2 className="details__title">{details?.name}</h2>

      <Image src={details?.images || []} />

      <div className="details__temp">
        <div className="details__temp-color">
          <label htmlFor="avia-color" className="details__color-label">
            Available colors
            <div className="details__color" id="avia-color">
              {details?.colorsAvailable.map(color => {
                if (colorMap.hasOwnProperty(color)) {
                  const colorValue = colorMap[color];

                  return (
                    <div
                      className={cn('details__color-div', {
                        'details__color-div-active': details.color === color,
                      })}
                      key={color}
                    >
                      <button
                        className="details__color-btn"
                        style={{ backgroundColor: colorValue }}
                        onClick={() => handleChange(color, details.capacity)}
                      ></button>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </label>

          <div className="details__id">{`ID: ${uniqId(details?.id || '')}`}</div>
        </div>

        <div className="details__border"></div>

        <div className="details__capacity">
          <label
            htmlFor="details__capacity-button"
            className="details__capacity-label"
          >
            <span>Select capacity</span>

            <div className="details__capacity-block">
              {details?.capacityAvailable.map(capacity => {
                return (
                  <ButtonCapcity
                    capacity={capacity}
                    key={capacity}
                    currentCapcity={details.capacity}
                    onClick={() => handleChange(details.color, capacity)}
                  />
                );
              })}
            </div>
          </label>
        </div>

        <div className="details__border"></div>

        <div className="details__price">
          <strong>{`$${details?.priceDiscount}`}</strong>
          <span className="details__price-span">{`$${details?.priceRegular}`}</span>
        </div>

        <div className="details__add">
          <ButtonsAddToCart
            title={`Add to cart`}
            size={`small`}
            product={product}
          />
          <ButtonsFavourites product={product} />
        </div>

        <ul className="details__list ul">
          <li className="details__item ul__item">
            Screen
            <span className="ul__item-span">{details?.screen}</span>
          </li>

          <li className="details__item ul__item">
            Resolution
            <span className="ul__item-span">{details?.resolution}</span>
          </li>

          <li className="details__item ul__item">
            Processor
            <span className="ul__item-span">{details?.processor}</span>
          </li>

          <li className="details__item ul__item">
            RAM
            <span className="ul__item-span">{details?.ram}</span>
          </li>
        </ul>
      </div>

      <h3 className="details__about">About</h3>

      <article className="details__abouts">
        <h2 className="details__abouts-title">And then there was Pro</h2>

        <p className="details__abouts-paragraph">
          A transformative triple‑camera system that adds tons of capability
          without complexity. <br /> An unprecedented leap in battery life. And
          a mind‑blowing chip that doubles down on machine learning and pushes
          the boundaries of what a smartphone can do. Welcome to the first
          iPhone powerful enough to be called Pro.
        </p>
      </article>

      <article className="details__abouts">
        <h2 className="details__abouts-title">Camera</h2>

        <p className="details__abouts-paragraph">
          Meet the first triple‑camera system to combine cutting‑edge technology
          with the legendary simplicity of iPhone. Capture up to four times more
          scene. Get beautiful images in drastically lower light. Shoot the
          highest‑quality video in a smartphone — then edit with the same tools
          you love for photos. You’ve never shot with anything like it.
        </p>
      </article>

      <article className="details__abouts">
        <h2 className="details__abouts-title">
          Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love
          it.
        </h2>

        <p className="details__abouts-paragraph">
          iPhone 11 Pro lets you capture videos that are beautifully true to
          life, with greater detail and smoother motion. Epic processing power
          means it can shoot 4K video with extended dynamic range and cinematic
          video stabilization — all at 60 fps. You get more creative control,
          too, with four times more scene and powerful new editing tools to play
          with.
        </p>
      </article>

      <h3 className="details__tech-title">Tech specs</h3>

      <ul className="details__tech ul">
        <li className="details__tech-item ul__item">
          Screen
          <span className="details__tech-span ul__item-span">6.5” OLED</span>
        </li>

        <li className="details__tech-item ul__item">
          Resolution
          <span className="details__tech-span ul__item-span">2688x1242</span>
        </li>

        <li className="details__tech-item ul__item">
          Processor
          <span className="details__tech-span ul__item-span">
            Apple A12 Bionic
          </span>
        </li>

        <li className="details__tech-item ul__item">
          RAM
          <span className="details__tech-span ul__item-span">3 GB</span>
        </li>

        <li className="details__tech-item ul__item">
          Built in memory
          <span className="details__tech-span ul__item-span">64 GB</span>
        </li>

        <li className="details__tech-item ul__item">
          Camera
          <span className="details__tech-span ul__item-span">
            12 Mp + 12 Mp + 12 Mp (Triple)
          </span>
        </li>

        <li className="details__tech-item ul__item">
          Zoom
          <span className="details__tech-span ul__item-span">Optical, 2x</span>
        </li>

        <li className="details__tech-item ul__item">
          Cell
          <span className="details__tech-span ul__item-span">
            GSM, LTE, UMTS
          </span>
        </li>
      </ul>

      <ProductSlider title={`You may also like`} product={suggestedProducts} />
    </div>
  );
};

export default ProductDetailsPage;
