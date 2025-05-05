import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PhoneDetailsPageProps } from '@/types/Product';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Buttons } from '@/components/Buttons';
import { ProductsSlider } from '@/modules/HomePage/components/ProductsSlider';
import { sortByModelNumber } from '@/utils/sortByModelNumber';

export const PhoneDetailsPage = ({ product }: PhoneDetailsPageProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();

  const colorClassMap: Record<string, string> = {
    black: 'bg-[#1c1c1e]',
    white: 'bg-[#f2f2f7]',
    yellow: 'bg-[#f9e79f]',
    red: 'bg-[#c8102e]',
    green: 'bg-[#4c7354]',
    purple: 'bg-[#cfc3e6]',
    pink: 'bg-[#f4c2c2]',
    coral: 'bg-[#f88379]',
    gold: 'bg-[#f0e3ce]',
    silver: 'bg-[#d8d8d8]',
    rosegold: 'bg-[#f6d1c1]',
    spacegray: 'bg-[#505153]',
    spaceblack: 'bg-[#2c2c2e]',
    graphite: 'bg-[#3a3a3c]',
    sierrablue: 'bg-[#a2c5d9]',
    midnightgreen: 'bg-[#4e5851]',
  };

  if (!product) {
    return (
      <div className="text-center font-mont text-5xl mt-20 text-text-color-base-white">
        Phone not found
      </div>
    );
  }

  const fields_1 = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
  ];

  const fields_2 = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
    { label: 'Built in memory', value: product.capacity },
    { label: 'Camera', value: product.camera },
    { label: 'Zoom', value: product.zoom },
    { label: 'Cell', value: product.cell.join(', ') },
  ];

  const selectedColor = product.color;
  const selectedCapacity = product.capacity;

  const handleColorChange = (color: string) => {
    navigate(
      `/phones/${product.namespaceId}-${selectedCapacity.toLowerCase()}-${color}`,
    );
  };

  const handleCapacityChange = (capacity: string) => {
    navigate(
      `/phones/${product.namespaceId}-${capacity.toLowerCase()}-${selectedColor}`,
    );
  };

  return (
    <div className="text-text-color-base-white font-mont">
      <Breadcrumbs currentName={product.name} />

      <div className="px-4 sm:px-6 md:px-8 xl:px-[152px]">
        <Link to="/phones" className="flex items-center gap-x-1 pt-10 text-xs">
          <img src="icons/arrow-left.svg" alt="back" />
          Back
        </Link>

        <h1 className="pt-4 font-extrabold text-[32px] leading-[41px] tracking-negative-1">
          {product.name}
        </h1>

        <div className="pt-10 flex flex-wrap gap-16">
          <div className="flex gap-4">
            <div className="flex flex-col gap-4 w-20 h-20">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Image ${i}`}
                  onClick={() => setSelectedImage(i)}
                  className={`w-[66px] h-[66px] object-contain cursor-pointer transition-all hover:scale-105 ${
                    selectedImage === i
                      ? 'border-[1px] border-text-color-base-white'
                      : 'border border-color-border'
                  }`}
                />
              ))}
            </div>

            <div className="w-[464px] h-[464px]">
              <img
                src={product.images[selectedImage]}
                alt="Selected"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col w-[320px]">
            <div className="flex flex-col gap-2">
              <h5 className="text-text-color-base-grey text-xs font-bold">
                Available colors
              </h5>
              <div className="flex gap-x-2">
                {product.colorsAvailable.map(color => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
                      ${
                        selectedColor === color
                          ? 'border-text-color-base-white border-2'
                          : 'border border-color-border hover:border-text-color-base-grey'
                      }
                    `}
                    aria-label={`Color ${color}`}
                  >
                    <div
                      className={`w-[32px] h-[32px] rounded-full ${colorClassMap[color] ?? 'bg-gray-500'}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-color-border w-full mt-6"></div>

            <div className="flex flex-col gap-2 pt-6">
              <h5 className="text-text-color-base-grey text-xs font-bold">
                Select capacity
              </h5>
              <div className="flex gap-2">
                {product.capacityAvailable.map(capacity => {
                  const [num, unit] = capacity.match(/\d+|[A-Z]+/g) ?? [];
                  return (
                    <button
                      key={capacity}
                      onClick={() => handleCapacityChange(capacity)}
                      className={`px-2 pt-[7px] pb-1 h-8 leading-[21px] border flex items-center text-sm font-semibold 
                      transition-all duration-200
                      ${
                        selectedCapacity === capacity
                          ? 'bg-text-color-base-white text-background-color-base'
                          : 'border-background-color-btn-hover text-text-color-base-white bg-transparent hover:bg-text-color-base-white hover:text-background-color-base'
                      }
                    `}
                    >
                      <div className="flex gap-[3px]">
                        <span>{num}</span>
                        <span>{unit}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="h-px bg-color-border w-full mt-6"></div>

            <div className="pt-8 flex items-center gap-2">
              <p className="text-text-color-base-white font-extrabold text-[32px] leading-[41px] tracking-negative-1">
                $
                {product.priceDiscount
                  ? product.priceDiscount
                  : product.priceRegular}
              </p>

              {product.priceDiscount &&
                product.priceDiscount < product.priceRegular && (
                  <p className="text-text-color-base-grey font-semibold line-through text-[22px] leading-[100%]">
                    ${product.priceRegular}
                  </p>
                )}
            </div>

            <div className="pt-4">
              <Buttons
                cartButtonClassName="h-12"
                favButtonClassName="w-12 h-12"
              />
            </div>

            <div className="font-bold text-xs pt-8 space-y-2">
              {fields_1.map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span className="text-text-color-base-grey">{label}</span>
                  <span className="text-text-color-base-white">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="font-bold text-xs leading-[100%] text-background-color-btn-hover">
            ID: 8023904
          </div>

          <div className="flex flex-col lg:flex-row gap-16 pt-20 w-full">
            <div className="w-full lg:basis-[560px] lg:max-w-[560px]">
              <h3 className="text-text-color-base-white text-[22px] font-extrabold leading-[140%]">
                About
              </h3>
              <div className="h-px bg-color-border mt-4 w-full"></div>

              <h4 className="pt-8 font-bold text-[20px]">
                And then there was Pro
              </h4>
              <div className="pt-4 text-text-color-base-grey text-sm font-semibold leading-[21px] space-y-4">
                <p>
                  A transformative triple-camera system that adds tons of
                  capability without complexity.
                </p>
                <p>
                  An unprecedented leap in battery life. And a mind-blowing chip
                  that doubles down on machine learning and pushes the
                  boundaries of what a smartphone can do. Welcome to the first
                  iPhone powerful enough to be called Pro.
                </p>
              </div>

              <h4 className="pt-8 font-bold text-[20px]">Camera</h4>
              <p className="pt-4 text-text-color-base-grey text-sm font-semibold leading-[21px]">
                Meet the first triple-camera system to combine cutting-edge
                technology with the legendary simplicity of iPhone. Capture up
                to four times more scene. Get beautiful images in drastically
                lower light. Shoot the highest-quality video in a smartphone —
                then edit with the same tools you love for photos. You’ve never
                shot with anything like it.
              </p>
              <h4 className="pt-8 font-bold text-[20px]">
                Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it.
                Love it.
              </h4>
              <p className="pt-4 text-text-color-base-grey text-sm font-semibold leading-[21px]">
                iPhone 11 Pro lets you capture videos that are beautifully true
                to life, with greater detail and smoother motion. Epic
                processing power means it can shoot 4K video with extended
                dynamic range and cinematic video stabilization — all at 60 fps.
                You get more creative control, too, with four times more scene
                and powerful new editing tools to play with.
              </p>
            </div>

            <div className="w-full lg:basis-[512px] lg:max-w-[512px]">
              <h3 className="text-text-color-base-white text-[22px] font-extrabold leading-[140%]">
                Tech specs
              </h3>
              <div className="h-px bg-color-border mt-4 w-full"></div>

              <div className="font-semibold text-xs pt-[25px] space-y-2">
                {fields_2.map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-text-color-base-grey">{label}</span>
                    <span className="text-text-color-base-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <ProductsSlider
          title={'You may also like'}
          subtitle={''}
          className={'xl:px-[0]'}
          sortFunction={sortByModelNumber}
        />
      </div>
    </div>
  );
};
