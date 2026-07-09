/* eslint-disable jsx-a11y/label-has-associated-control */
import ProductSlider from '../components/base/ProductSlider';
import BackButton from '../components/ui/BackButton';
import ButtonBox from '../components/ui/ButtonBox';
import { useContext, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';
import { useParams } from 'react-router-dom';
import { Product } from '../types/itemTypes';
import UrlTrail from '../components/ui/UrlTrail';

const bgColors: { [key: string]: string } = {
  black: 'bg-black',
  white: 'bg-white',
  red: 'bg-red-500',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  yellow: 'bg-yellow-500',
  purple: 'bg-purple-500',
  graphite: 'bg-gray-800',
  gold: 'bg-yellow-400',
  sierrablue: 'bg-sky-500',
  midnight: 'bg-purple-900',
  pink: 'bg-pink-500',
  spaceblack: 'bg-gray-900',
  spacegray: 'bg-gray-700',
  silver: 'bg-gray-400',
  coral: 'bg-rose-400',
  rosegold: 'bg-rose-200',
  midnightgreen: 'bg-emerald-900',
};

const ProductPage: React.FC = () => {
  const {
    displayProduct,
    handleGetItemByCategory,
    handleDisplayImage,
    handleGetItemByFeature,
    displayImage,
    products,
  } = useContext(ProductContext);

  const { category, id } = useParams();

  const pageProduct = products.find(product => product.itemId === id);
  const selectedColor = displayProduct?.color;
  const selectedCapacity = displayProduct?.capacity;

  useEffect(() => {
    if (category && id) {
      handleGetItemByCategory(category, id);
    }
  }, [category, handleGetItemByCategory, id]);

  useEffect(() => {
    if (displayProduct) {
      handleDisplayImage(displayProduct.images[0]);
    }
  }, [displayProduct, handleDisplayImage]);

  if (!pageProduct) {
    return (
      <div className="p-10 text-center text-2xl font-bold">
        Product not found!
      </div>
    );
  }

  const shuffle = (array: Product[]) => {
    const newArray = [...array];

    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
  };

  const sliderProducts = products
    .filter(product => product.category === category)
    .filter(product => product.id !== pageProduct.id)
    .sort((a, b) => a.name.localeCompare(b.name));

  const shuffledSliderProducts = shuffle(sliderProducts);

  return (
    <main className="flex flex-col w-full px-4 sm:px-6 md:px-8 h-full gap-20">
      <div className="flex flex-col">
        <UrlTrail />
        <BackButton />
        <h1 className="sm:text-3xl text-[22px] mb-8 sm:mb-10 mt-4 font-bold">
          {displayProduct?.name}
        </h1>
        <div className="flex flex-col sm:flex-row">
          <div className="flex mb-10 sm:mb-0 sm:flex-col gap-2 sm:gap-4">
            {displayProduct?.images.map((image, index) => (
              <img
                key={index}
                onClick={() => handleDisplayImage(image)}
                className="size-20 border p-1 border-gray-300 object-contain cursor-pointer"
                src={`/${image}`}
                alt={image}
              />
            ))}
          </div>
          <div className="order-first mb-4 sm:mb-0 sm:order-none">
            <img
              className="size-[464px] object-contain"
              src={
                !displayImage
                  ? `/${displayProduct?.images[0]}`
                  : `/${displayImage}`
              }
              alt=""
            />
          </div>
          <div className="flex sm:ml-16 sm:w-[20rem] gap-6 flex-col">
            <fieldset className="flex flex-col">
              <legend className="mb-2">Available colors</legend>
              <div className="flex gap-2">
                {displayProduct?.colorsAvailable.map(color => (
                  <label
                    key={color}
                    htmlFor={`color-${color}`}
                    className={`border-2 has-[:checked]:border-black cursor-pointer ${bgColors[color]} size-8 rounded-full`}
                  >
                    <input
                      className="sr-only"
                      type="radio"
                      checked={selectedColor === color}
                      name="color"
                      id={`color-${color}`}
                      onChange={() => {
                        handleGetItemByFeature(
                          displayProduct?.category,
                          displayProduct?.namespaceId,
                          color,
                          selectedCapacity!,
                        );
                      }}
                    />
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="card__line-separator"></div>
            <fieldset>
              <legend className="mb-2">Select capacity</legend>
              <div className="flex gap-2">
                {displayProduct?.capacityAvailable.map(capacity => (
                  <label
                    key={capacity}
                    htmlFor={`capacity-${capacity}`}
                    className="w-16 h-8 has-[:checked]:bg-black has-[:checked]:text-white
                      flex justify-center items-center border border-gray-400 text-bold
                      text-sm cursor-pointer"
                  >
                    <input
                      className="sr-only"
                      type="radio"
                      checked={selectedCapacity === capacity}
                      name="capacity"
                      id={`capacity-${capacity}`}
                      onChange={() => {
                        handleGetItemByFeature(
                          displayProduct?.category,
                          displayProduct?.namespaceId,
                          selectedColor!,
                          capacity,
                        );
                      }}
                    />
                    {capacity}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="card__line-separator"></div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <h3 className="font-bold text-3xl">
                  ${displayProduct?.priceDiscount}
                </h3>
                <h3 className="text-[1.25rem] text-gray-400 font-bold">
                  ${displayProduct?.priceRegular}
                </h3>
              </div>
              <ButtonBox product={pageProduct} />
            </div>
            <div className="flex text-xs justify-between">
              <div className="flex flex-col items-start gap-1 text-gray-400">
                <p>Screen</p>
                <p>Resolution</p>
                <p>Processor</p>
                <p>RAM</p>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <p>{displayProduct?.specs.screen}</p>
                <p>{displayProduct?.specs.resolution}</p>
                <p>{displayProduct?.specs.processor}</p>
                <p>{displayProduct?.specs.ram}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-14 md:gap-16 md:flex-row justify-between">
        <div className="flex sm:w-[35rem] gap-5 flex-col">
          <h2 className="text-2xl font-bold">About</h2>
          <div className="card__line-separator"></div>
          <div className="flex gap-8 flex-col">
            {displayProduct?.description.map((description, index) => (
              <div key={index} className="flex gap-4 flex-col">
                <h3 className="text-xl">{description.title}</h3>
                <p className="text-gray-400">{description.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex md:w-[32rem] gap-4 flex-col">
          <h2 className="text-xl font-bold">Tech specs</h2>
          <div className="card__line-separator"></div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1 text-gray-400 items-start">
              <p>Screen</p>
              <p>Resolution</p>
              <p>Processor</p>
              <p>RAM</p>
              <p>Built in memory</p>
              {displayProduct?.specs.camera && <p>Camera</p>}
              {displayProduct?.specs.zoom && <p>Zoom</p>}
              <p>Cell</p>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <p>{displayProduct?.specs.screen}</p>
              <p>{displayProduct?.specs.resolution}</p>
              <p>{displayProduct?.specs.processor}</p>
              <p>{displayProduct?.specs.ram}</p>
              <p>{displayProduct?.capacity}</p>
              <p>{displayProduct?.specs.camera}</p>
              <p>{displayProduct?.specs.zoom}</p>
              <p>{displayProduct?.specs.cell.join(', ')}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ProductSlider
          title="You may also like"
          filteredProducts={shuffledSliderProducts}
        />
      </div>
    </main>
  );
};

export default ProductPage;
