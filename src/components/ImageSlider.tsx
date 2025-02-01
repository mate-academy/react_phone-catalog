import { useEffect, useState } from 'react';
import { useAppSelector } from '../utils/hooks';

export const ImageSlider = () => {
  const { selectedProduct } = useAppSelector(state => state.selectedProduct);

  const [mainImg, setMainImg] = useState(selectedProduct?.images[0] || '');

  const handleSetMainImg = (image: string) => {
    setMainImg(image);
  };

  useEffect(() => {
    setMainImg(selectedProduct?.images[0] || '');
  }, [selectedProduct]);

  const windowWidth = window.innerWidth;

  return (
    <>
      {selectedProduct && (
        <>
          {windowWidth < 640 && (
            <div
              className="
                col-[1/5]
                sm:col-[2/8]
                xl:col-[3/13]
              "
            >
              <img
                src={mainImg}
                alt="ProductImg"
                className="
                  aspect-square
                  w-full
                  object-contain
                "
              />
            </div>
          )}

          <div
            className="
              col-[1/5]
              mb-[40px]
              mt-[16px]
              flex
              items-center
              justify-center
              gap-[8px]
              sm:col-[1/2]
              sm:m-0
              sm:flex-col
              sm:justify-normal
              xl:col-[1/3]
            "
          >
            {selectedProduct.images.map(image => (
              <div
                key={image}
                className={`
                  aspect-square
                  w-full
                  cursor-pointer
                  rounded-[4px]
                  border
                  ${image === mainImg ? 'border-primary' : 'border-elements'}
                `}
                onClick={() => {
                  handleSetMainImg(image);
                }}
              >
                <img
                  src={image}
                  alt="SliderImg"
                  className="h-full w-full object-contain sm:aspect-square"
                />
              </div>
            ))}
          </div>

          {windowWidth >= 640 && (
            <div
              className="
                col-[1/5]
                sm:col-[2/8]
                xl:col-[3/13]
              "
            >
              <img
                src={mainImg}
                alt="ProductImg"
                className="
                  aspect-square
                  w-full
                  object-contain
                "
              />
            </div>
          )}
        </>
      )}
    </>
  );
};
