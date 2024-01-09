/* eslint-disable max-len */
/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { getGadgetDescription } from '../../support/api';
import { DeviceInfo, Gadget } from '../../support/types';
import { Itemimage } from '../Itemimage';
import { ButtonToCart } from '../ButtonToCart';
import { ButtonFavorite } from '../ButtonFavorite';
import { storeGadgets } from '../../store/store';
import { Carousel } from '../Carousel';
import { PIckColor } from '../PIckColor';

type Props = {
  device: Gadget;
};

export const Itemcard: React.FC<Props> = ({ device }) => {
  const [item, setItem] = useState<DeviceInfo>();
  const [color, setColor] = useState(device.color);
  const [mainImage, setMainImage] = useState(device.imageUrl);
  const gadgets = storeGadgets().list.filter(el => el.type === device.type && el.name !== item?.name);

  useEffect(() => {
    if (device) {
      getGadgetDescription(device.id)
        .then((res) => {
          setItem(res);
          setColor(res.color || '');
          setMainImage(device.imageUrl);
        });
    }
  }, [device]);

  const allPhones = {
    className: 'hotprices-slider',
    slideStyle: 'h-[507px] max-w-[272px]',
    prevStyle: 'slick-arrow-square slick-arrow-square-prev',
    nextStyle: 'slick-arrow-square slick-arrow-square-next',
    autoplay: true,
    swipeToSlide: false,
    touchMove: false,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    data: gadgets,
  };

  return (
    <section>
      <h1 className="h1 text-primary mt-4 mb-10">
        {`${device.name} ${
          color || 'Black'
        } ${device.capacity}`}

      </h1>
      <div className="grid grid-cols-2 gap-16">
        <div className="flex justify-between">
          <div className="flex gap-y-4 flex-col">
            {item?.images.map((img) => (
              <Itemimage
                mainImage={mainImage as string}
                src={img}
                setImg={setMainImage}
                key={img}
              />
            ))}
          </div>

          <div className="mainimage flex justify-center items-start grow ml-4">
            <img src={mainImage} alt="mainImage" />
          </div>
        </div>
        <div className="description flex flex-col flex-grow">
          <div>
            <h6 className="h6 mb-2">Available colors</h6>
            <div className="flex gap-x-2">
              <PIckColor set={setColor} color={color || ''} />
            </div>
          </div>

          <div className="h-[1px] w-full bg-elements my-6" />

          { device.capacity && (
            <>
              <div>
                <h6 className="h6 mb-2">Select capacity</h6>
                <div className="flex gap-x-2">
                  <div className="flex items-center justify-center h5 text-white bg-primary px-1 py-[4px] h-auto">
                    {device?.capacity}
                  </div>
                </div>
              </div>
              <div className="h-[1px] w-full bg-elements mt-6 mb-8" />
            </>
          )}

          <p className="h2 mb-4">
            <span className="pr-2 font-bold">
              {`$${device.price - (device.price / 100) * device.discount}`}
            </span>
            {device.discount > 0 ? (
              <span className=" font-bold inline-block text-secondary text-line-ivert relative mix-blend">{`$${device.price}`}</span>
            ) : (
              <></>
            )}
          </p>
          <div className="flex gap-x-2 mb-4">
            <ButtonToCart itemID={device.id} />
            <ButtonFavorite itemID={device.id} />
          </div>

          <div className="flex flex-col">
            <p className="flex justify-between">
              <span className="text-secondary text-[12px] font-semibold">
                Screen
              </span>
              <span className="text-primary text-[12px] font-semibold">
                {item?.display.screenSize}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-secondary text-[12px] font-semibold">
                Resolution
              </span>
              <span className="text-primary text-[12px] font-semibold">
                {item?.display.screenResolution}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-secondary text-[12px] font-semibold">
                Processor
              </span>
              <span className="text-primary text-[12px] font-semibold">
                {item?.hardware.cpu}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-secondary text-[12px] font-semibold">
                RAM
              </span>
              <span className="text-primary text-[12px] font-semibold">
                {item?.storage.ram}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-16 my-20">
        <div>
          <h2 className="h2 text-primary text-left">About</h2>
          <div className="h-[1px] w-full bg-elements mt-4 mb-8" />
          <p className="text-secondary h5 text-justify">{item?.description}</p>
        </div>
        <div>
          <h2 className="h2 text-primary text-left">Tech specs</h2>
          <div className="h-[1px] w-full bg-elements mt-4 mb-8" />

          <div className="flex flex-col">
            <p className="flex justify-between">
              <span className="text-secondary text-[12px] font-semibold">
                Screen
              </span>
              <span className="text-primary text-[14px]">
                {item?.display.screenSize}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-secondary text-[12px] font-semibold">
                Resolution
              </span>
              <span className="text-primary text-[14px]">
                {item?.display.screenResolution}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-secondary text-[12px] font-semibold">
                Processor
              </span>
              <span className="text-primary text-[14px]">
                {item?.hardware.cpu}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-secondary text-[12px] font-semibold">
                RAM
              </span>
              <span className="text-primary text-[14px]">
                {item?.storage.ram}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-secondary text-[12px] font-semibold">
                Built in memory
              </span>
              <span className="text-primary text-[14px]">
                {item?.storage.flash}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-secondary text-[12px] font-semibold">
                Camera
              </span>
              <span className="text-primary text-[14px]">
                {item?.camera.primary}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-secondary text-[12px] font-semibold">
                Cell
              </span>
              <span className="text-primary text-[14px] max-w-[60%] text-justify">
                {item?.connectivity.cell}
              </span>
            </p>
          </div>
        </div>
      </div>

      <h2 className="h2 max-w-[1136px] mx-auto mt-[72px] mb-6">
        You may also like
      </h2>
      <div className="flex flex-wrap">
        <Carousel {...allPhones} />
      </div>
    </section>
  );
};
