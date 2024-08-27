import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../AppContext';
import { Loader } from '../../components/Loader';
import { useParams } from 'react-router-dom';
import { ProductType } from '../../types/ProductType';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { BackBtn } from '../../components/BackBtn';
// SWIPER
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import 'swiper/scss';

export const ProductDetailsPage = () => {
  const { products, errorMessage, setErrorMessage, isLoading } =
    useContext(AppContext);
  const { productId } = useParams();
  const [currentProduct, setCurrentProduct] = useState<ProductType | null>(
    null,
  );
  const [images, setImages] = useState<string[]>([]);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (productId === undefined) {
      setErrorMessage('Product ID is missing!');
    } else {
      const foundedProduct = products.find(p => p.id === +productId) || null;

      setCurrentProduct(foundedProduct);

      if (foundedProduct) {
        const itemId = foundedProduct.itemId.split('-').slice(0, -2).join('-');
        const colorFolder = foundedProduct.color;
        const imageFolder = `img/phones/${itemId}/${colorFolder}/`;
        const imageFiles = [
          `${imageFolder}00.webp`,
          `${imageFolder}01.webp`,
          `${imageFolder}02.webp`,
          `${imageFolder}03.webp`,
          `${imageFolder}04.webp`,
        ];

        setImages(imageFiles);
      }
    }
  }, [productId, products, setErrorMessage]);

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
    thumbsSwiper?.slideTo(index);
  };

  return (
    <section className="product-details page">
      <div className="container">
        {isLoading && <Loader />}

        {!isLoading && (
          <>
            <Breadcrumbs className="product-details__breadcrumbs" />
            <BackBtn className="product-details__back-btn" />

            {errorMessage && (
              <span className="notification">{errorMessage}</span>
            )}

            {currentProduct && (
              <div className="product-details__wrapper">
                <h2 className="product-details__title">
                  {currentProduct.name}
                </h2>

                <Swiper
                  className="product-details__images"
                  slidesPerView={1}
                  modules={[Thumbs]}
                  thumbs={{ swiper: thumbsSwiper }}
                  onSlideChange={swiper => setSelectedIndex(swiper.activeIndex)}
                  initialSlide={selectedIndex}
                >
                  {images.map((image, index) => (
                    <SwiperSlide
                      className="product-details__images-item"
                      key={index}
                    >
                      <div className="product-details__images-img">
                        <img src={image} alt={`Product Image ${index + 1}`} />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <Swiper
                  className="product-details__thumbs"
                  slidesPerView={images.length}
                  modules={[Thumbs]}
                  onSwiper={swiper => setThumbsSwiper(swiper)}
                  watchSlidesProgress
                >
                  {images.map((image, index) => (
                    <SwiperSlide
                      className="product-details__thumbs-item"
                      key={index}
                    >
                      <button
                        key={index}
                        className={`product-details__thumbs-btn ${index === selectedIndex ? 'product-details__thumbs-btn--active' : ''}`}
                        onClick={() => handleThumbnailClick(index)}
                      >
                        <img src={image} alt={`Thumbnail ${index + 1}`} />
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
