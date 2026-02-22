import ProductSlider from '../components/base/ProductSlider';
import BackButton from '../components/ui/BackButton';
import ButtonBox from '../components/ui/ButtonBox';
import { useContext, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';
import { useParams } from 'react-router-dom';
import { Product } from '../types/itemTypes';

const bgColors = {
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
  const { displayProduct, handleGetItemByCategory ,products } = useContext(ProductContext);

  const { category, id } = useParams();

  useEffect(() => {
    handleGetItemByCategory(category!, id!)
  },[displayProduct])


  const pageProduct = products.find(product => product.itemId === id);

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
        <div>{/* url trail */}</div>
        <BackButton />
        <h1 className="sm:text-3xl text-[22px] mb-8 sm:mb-10 mt-4 font-bold">
          {displayProduct?.name}
        </h1>
        <div className="flex flex-col sm:flex-row">
          <div className="flex mb-10 sm:mb-0 sm:flex-col gap-2 sm:gap-4">
            <img
              className="size-20 border p-1 border-gray-300 object-contain"
              src="../../public/img/phones/apple-iphone-11/black/00.webp"
              alt=""
            />
            <img
              className="size-20 object-contain"
              src="../../public/img/phones/apple-iphone-11/black/01.webp"
              alt=""
            />
            <img
              className="size-20 object-contain"
              src="../../public/img/phones/apple-iphone-11/black/02.webp"
              alt=""
            />
            <img
              className="size-20 object-contain"
              src="../../public/img/phones/apple-iphone-11/black/03.webp"
              alt=""
            />
            <img
              className="size-20 object-contain"
              src="../../public/img/phones/apple-iphone-11/black/04.webp"
              alt=""
            />
          </div>
          <div className="order-first mb-4 sm:mb-0 sm:order-none">
            <img
              className="size-[464px] object-contain"
              src="../../public/img/phones/apple-iphone-11/black/00.webp"
              alt=""
            />
          </div>
          <div className="flex sm:ml-16 sm:w-[20rem] gap-6 flex-col">
            <fieldset className="flex flex-col">
              <legend>Available colors</legend>
              <div className="flex gap-2">
                {/* input border changes with input check */}
                <label
                  className="border-2 has-[:checked]:border-black size-8 rounded-full "
                  htmlFor="color"
                >
                  <input
                    className="size-0"
                    type="radio"
                    name="color"
                    id="color"
                  />
                </label>
                <label className="border size-8 rounded-full " htmlFor="color">
                  <input
                    className="size-0"
                    type="radio"
                    name="color"
                    id="color"
                  />
                </label>
                <label className="border size-8 rounded-full " htmlFor="color">
                  <input
                    className="size-0"
                    type="radio"
                    name="color"
                    id="color"
                  />
                </label>
              </div>
            </fieldset>
            <div className="card__line-separator"></div>
            <fieldset>
              <legend>Select capacity</legend>
              <div className="flex gap-2">
                <label
                  className="w-14 h-8 has-[:checked]:bg-black has-[:checked]:text-white flex justify-center items-center border border-gray-400 text-bold text-sm"
                  htmlFor="size"
                >
                  64 GB
                  <input
                    className="size-0"
                    type="radio"
                    placeholder="64 GB"
                    name="size"
                    id="size"
                  />
                </label>
                <label
                  className="w-14 h-8 has-[:checked]:bg-black has-[:checked]:text-white flex justify-center items-center border border-gray-400 text-bold text-sm"
                  htmlFor="size"
                >
                  256 GB
                  <input
                    className="size-0"
                    type="radio"
                    placeholder="64 GB"
                    name="size"
                    id="size"
                  />
                </label>
                <label
                  className="w-14 h-8 has-[:checked]:bg-black has-[:checked]:text-white flex justify-center items-center border border-gray-400 text-bold text-sm"
                  htmlFor="size"
                >
                  512 GB
                  <input
                    className="size-0"
                    type="radio"
                    placeholder="64 GB"
                    name="size"
                    id="size"
                  />
                </label>
              </div>
            </fieldset>
            <div className="card__line-separator"></div>
            <div className="flex flex-col gap-4">
              <div className="flex border gap-2">
                <h3 className="font-bold text-3xl">$799</h3>
                <h3 className="text-[1.25rem] text-gray-400 font-bold">
                  $1199
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
                <p>6.5" OLED</p>
                <p>2688x1242</p>
                <p>Apple A12 Bionic</p>
                <p>3 GB</p>
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
            <div className="flex gap-4 flex-col">
              <h3 className="text-xl">And then there was Pro</h3>
              <p className="text-gray-400">
                A transformative triple‑camera system that adds tons of
                capability without complexity. An unprecedented leap in battery
                life. And a mind‑blowing chip that doubles down on machine
                learning and pushes the boundaries of what a smartphone can do.
                Welcome to the first iPhone powerful enough to be called Pro.
              </p>
            </div>
            <div className="flex gap-4 flex-col">
              <h3 className="text-xl`">Camera</h3>
              <p className="text-gray-400">
                Meet the first triple‑camera system to combine cutting‑edge
                technology with the legendary simplicity of iPhone. Capture up
                to four times more scene. Get beautiful images in drastically
                lower light. Shoot the highest‑quality video in a smartphone —
                then edit with the same tools you love for photos. You’ve never
                shot with anything like it.
              </p>
            </div>
            <div className="flex gap-4 flex-col">
              <h3 className="text-xl">
                Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it.
                Love it.
              </h3>
              <p className="text-gray-400">
                iPhone 11 Pro lets you capture videos that are beautifully true
                to life, with greater detail and smoother motion. Epic
                processing power means it can shoot 4K video with extended
                dynamic range and cinematic video stabilization — all at 60 fps.
                You get more creative control, too, with four times more scene
                and powerful new editing tools to play with.
              </p>
            </div>
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
              <p>Camera</p>
              <p>Zoom</p>
              <p>Cell</p>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <p>6.5" OLED</p>
              <p>2688x1242</p>
              <p>Apple A12 Bionic</p>
              <p>3 GB</p>
              <p>64 GB</p>
              <p>12 Mp + 12 Mp + 12 Mp (Triple)</p>
              <p>Optical, 2x</p>
              <p>GSM, LTE, UMTS</p>
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
