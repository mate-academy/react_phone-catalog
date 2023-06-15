import './productDetailsPage.scss';
import BigImg from '../../images/productDetails/bigImg.png';
import SmallImg1 from '../../images/productDetails/imageSmall_1.png';
import SmallImg2 from '../../images/productDetails/imageSmall_2.png';
import SmallImg3 from '../../images/productDetails/imageSmall_3.png';
import FavoritesImg from '../../images/icons/Favourites (Heart Like).svg';

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
        <h1 className="productDetails__title">
          Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
        </h1>
        <div
          className="productDetails__mainDetails"
        >
          <div className="grid">
            <div
              className="productDetails__mainDetales__productID
              grid__item--desktop-23-24"
            >
              ID: 802390
            </div>
            <div
              className="productDetails__mainDetales
              productDetails__mainDetales__imagesContainer
              grid__item--desktop-1-12"
            >
              <div
                className="productDetails__mainDetales__imageSidebar
                grid__item--desktop-1-2"
              >
                <img
                  src={SmallImg1}
                  alt="product small"
                  className="productDetails__mainDetales__smallImage"
                />
                <img
                  src={SmallImg2}
                  alt="product small"
                  className="productDetails__mainDetales__smallImage"
                />
                <img
                  src={SmallImg3}
                  alt="product small"
                  className="productDetails__mainDetales__smallImage"
                />
              </div>

              <div
                className="productDetails__mainDetales__mainImage
                grid__item--desktop-4-11"
              >
                <img src={BigImg} alt="Main big" />
              </div>
            </div>

            <div
              className="productDetails__mainDetales__options
              grid__item--desktop-14-20"
            >
              <div
                className="productDetails__mainDetales__colors"
              >
                <p
                  className="productDetails__mainDetales__colors__title"
                >
                  Available colors
                </p>
                <div
                  className="productDetails__mainDetales__colors__container"
                >
                  <div
                    className="productDetails__mainDetales__colors__circle
                    productDetails__mainDetales__colors__circle--1"
                  />
                  <span
                    className="productDetails__mainDetales__colors__circle
                    productDetails__mainDetales__colors__circle--2"
                  />
                  <span
                    className="productDetails__mainDetales__colors__circle
                    productDetails__mainDetales__colors__circle--3"
                  />
                  <span
                    className="productDetails__mainDetales__colors__circle
                    productDetails__mainDetales__colors__circle--4"
                  />
                </div>
              </div>

              <div className="productDetails__mainDetales__capacity">
                <p
                  className="productDetails__mainDetales__capacity__title"
                >
                  Select capacity
                </p>

                <div
                  className="productDetails__mainDetales__itemContainer"
                >
                  <div
                    className="productDetails__mainDetales__capacity__item"
                  >
                    64 GB
                  </div>
                  <div
                    className="productDetails__mainDetales__capacity__item"
                  >
                    256 GB
                  </div>
                  <div
                    className="productDetails__mainDetales__capacity__item"
                  >
                    512 GB
                  </div>
                </div>

              </div>

              <div
                className="productDetails__mainDetales__buyBlock"
              >
                <div
                  className="productDetails__mainDetales__price"
                >
                  <h2
                    className="productDetails__mainDetales__price__full"
                  >
                    $1099
                  </h2>
                  <h2
                    className="productDetails__mainDetales__price__discont"
                  >
                    $1199
                  </h2>
                </div>
              </div>

              <div
                className="productDetails__mainDetales__btnContainer"
              >
                <button
                  type="button"
                  className="productDetails__mainDetales__btn"
                >
                  Add to cart
                </button>

                <div
                  className="productDetails__mainDetales__favoritesBtn"
                >
                  <img
                    src={FavoritesImg}
                    alt="favorites hearth"
                    className="productDetails__mainDetales__favoritesImg"
                  />
                </div>
              </div>

              <div
                className="productDetails__mainDetales__characteristics"
              >
                <div
                  className="productDetails__mainDetales__items"
                >
                  <div
                    className="productDetails__mainDetales__item"
                  >
                    Screen
                  </div>
                  <div
                    className="productDetails__mainDetales__item"
                  >
                    Resolution
                  </div>
                  <div
                    className="productDetails__mainDetales__item"
                  >
                    Processor
                  </div>
                  <div
                    className="productDetails__mainDetales__item"
                  >
                    RAM
                  </div>
                </div>

                <div
                  className="productDetails__mainDetales__values"
                >
                  <div
                    className="productDetails__mainDetales__value"
                  >
                    6.5” OLED
                  </div>
                  <div
                    className="productDetails__mainDetales__value"
                  >
                    2688x1242
                  </div>
                  <div
                    className="productDetails__mainDetales__value"
                  >
                    Apple A12 Bionic
                  </div>
                  <div
                    className="productDetails__mainDetales__value"
                  >
                    3 GB
                  </div>
                </div>
              </div>

            </div>

            {/* <div className='productDetails__additionalDetails grid__item--desktop-1-20'> */}
            <div
              className="productDetails__additionalDetails__about
              grid__item--desktop-1-12"
            >
              <h1 className="productDetails__additionalDetails__title">
                About
              </h1>
              <h2 className="productDetails__additionalDetails__paragraphName">
                And then there was Pro
              </h2>
              <p
                className="productDetails__additionalDetails__paragraph"
              >
                A transformative triple‑camera system
                that adds tons of capability without complexity.
                An unprecedented leap in battery life.
                And a mind‑blowing chip that doubles down on machine learning
                and pushes the boundaries of what a smartphone can do.
                Welcome to the first iPhone powerful enough to be called Pro.
              </p>
              <h2
                className="productDetails__additionalDetails__paragraphName"
              >
                Camera
              </h2>
              <p
                className="productDetails__additionalDetails__paragraph"
              >
                Meet the first triple‑camera system to combine cutting‑edge
                technology with the legendary simplicity of iPhone.
                Capture up to four times more scene. Get beautiful images in
                drastically lower light. Shoot the highest‑quality
                video in a smartphone —
                then edit with the same tools you love for photos.
                You’ve never shot with anything like it.
              </p>
              <h2
                className="productDetails__additionalDetails__paragraphName"
              >
                Shoot it. Flip it. Zoom it.
                Crop it. Cut it. Light it.
                Tweak it. Love it.
              </h2>
              <p
                className="productDetails__additionalDetails__paragraph"
              >
                iPhone 11 Pro lets you capture videos that
                are beautifully true to life,
                with greater detail and smoother motion.
                Epic processing power means it can shoot
                4K video with extended dynamic range and
                cinematic video stabilization — all at 60 fps.
                You get more creative control, too,
                with four times more scene and powerful
                new editing tools to play with.
              </p>
            </div>

            <div
              className="productDetails__additionalDetails__specs
            grid__item--desktop-14-24"
            >
              <h1 className="productDetails__additionalDetails__specs__title">
                About
              </h1>
              <div className="productDetails__additionalDetails__specs__tech">
                <div
                  className="productDetails__additionalDetails__specs__items"
                >
                  <div
                    className="productDetails__additionalDetails__specs__item"
                  >
                    Screen
                  </div>
                  <div
                    className="productDetails__additionalDetails__specs__item"
                  >
                    Resolution
                  </div>
                  <div
                    className="productDetails__additionalDetails__specs__item"
                  >
                    Processor
                  </div>
                  <div
                    className="productDetails__additionalDetails__specs__item"
                  >
                    RAM
                  </div>
                  <div
                    className="productDetails__additionalDetails__specs__item"
                  >
                    Built in memory
                  </div>
                  <div
                    className="productDetails__additionalDetails__specs__item"
                  >
                    Camera
                  </div>
                  <div
                    className="productDetails__additionalDetails__specs__item"
                  >
                    Zoom
                  </div>
                  <div
                    className="productDetails__additionalDetails__specs__item"
                  >
                    Cell
                  </div>
                </div>

                <div
                  className="productDetails__additionalDetails__specs__values"
                >
                  <div
                    className="productDetails__additionalDetails__specs__value"
                  >
                    6.5” OLED
                  </div>
                  <div
                    className="productDetails__additionalDetails__specs__value"
                  >
                    2688x1242
                  </div>
                  <div
                    className="productDetails__additionalDetails__specs__value"
                  >
                    Apple A12 Bionic
                  </div>
                  <div
                    className="productDetails__additionalDetails__specs__value"
                  >
                    3 GB
                  </div>
                  <div
                    className="productDetails__additionalDetails__specs__value"
                  >
                    64 GB
                  </div>
                  <div
                    className="productDetails__additionalDetails__specs__value"
                  >
                    12 Mp + 12 Mp + 12 Mp (Triple)
                  </div>
                  <div
                    className="productDetails__additionalDetails__specs__value"
                  >
                    Optical, 2x
                  </div>
                  <div
                    className="productDetails__additionalDetails__specs__value"
                  >
                    GSM, LTE, UMTS
                  </div>
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
