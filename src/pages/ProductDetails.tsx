import cn from 'clsx';
// import { useParams } from 'react-router';
import { useGetProductsByCategoryQuery } from '../services/productDetailsApi';
// import { Breadcrumbs } from '../components/Breadcrumbs';
import { FC } from 'react';
import { Category } from '../types';
import Favourites from '/src/assets/icons/favourites.svg?react';
import FavouritesFilled from '/src/assets/icons/favourites-filled.svg?react';
// import { ProductsSlider } from '../components/ProductsSlider';
// import { useSelector } from 'react-redux';
// import { selectProductsByCategory } from '../selectors/productsSelectors';

export const ProductDetailsPage: FC = () => {
  const { data: productDetails } = useGetProductsByCategoryQuery(
    Category.Phones,
  );
  // const { productId } = useParams();

  if (!productDetails) {
    return <h1 className="text-h1">No product details!</h1>;
  }

  const {
    // category,
    name,
    description,
    color,
    colorsAvailable,
    capacityAvailable,
    priceDiscount,
    priceRegular,
    screen,
    resolution,
    processor,
    ram,
    capacity,
    cell,
  } = productDetails[0];

  // const products = useSelector(selectProductsByCategory(category));

  return (
    <div className="pb-[56px] sm:pb-[64px] xl:pb-[80px]">
      {/*<Breadcrumbs className="mt-[24px]" />*/}

      <h1 className="mt-[16px] text-h1">{name}</h1>

      <div className="sm:pageGrid mt-[32px] sm:mt-[40px]">
        <div className="sm:col-span-5 xl:col-span-7 xl:col-start-14">
          <div className="flex flex-col pb-[24px] shadow-down shadow-elements">
            <div className="text-small text-secondary">Available colors</div>
            <ul className="flex gap-x-[8px] mt-[8px]">
              {colorsAvailable.map((value, i) => (
                <li key={i}>
                  <button
                    type="button"
                    className={cn(
                      'size-[32px] rounded-full border-[2px] border-white shadow-inner shadow-elements',
                      {
                        'bg-[#fb1230]': value === 'red',
                        'bg-[#ee7762]': value === 'coral',
                        'bg-[#e6c7c2]': value === 'rosegold',
                        'bg-[#fddcd7]': value === 'pink',
                        'bg-[#ffeacf]': value === 'gold',
                        'bg-[#fdea8c]': value === 'yellow',
                        'bg-[#e1f8dc]': value === 'green',
                        'bg-[#4e5850]': value === 'midnightgreen',
                        'bg-[#6ba1c4]': value === 'skyblue',
                        'bg-[#96badc]': value === 'sierrablue',
                        'bg-[#276787]': value === 'blue',
                        'bg-[#e5ddea]': value === 'purple',
                        'bg-[#f0f0dc]': value === 'starlight',
                        'bg-[#f9f6ef]': value === 'white',
                        'bg-[#c0c0c0]': value === 'silver',
                        'bg-[#696a6e]': value === 'graphite',
                        'bg-[#535150]': value === 'spacegray',
                        'bg-[#4b4845]': value === 'spaceblack',
                        'bg-[#343b43]': value === 'midnight',
                        'bg-[#201d24]': value === 'black',
                        'shadow-primary': value === color,
                      },
                    )}
                  ></button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col mt-[24px] pb-[24px] shadow-down shadow-elements">
            <div className="text-small text-secondary">Select capacity</div>
            <ul className="flex gap-x-[8px] mt-[8px]">
              {capacityAvailable.map((value, i) => (
                <li key={i}>
                  <button
                    type="button"
                    className={cn(
                      'h-[32px] px-[8px] shadow-inner shadow-icons',
                      {
                        'bg-primary shadow-primary text-white':
                          value === capacity,
                      },
                    )}
                  >
                    {value}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-[8px] mt-[32px]">
            <h2 className="text-h3 text-primary">${priceDiscount}</h2>

            <span className="line-through text-secondary">${priceRegular}</span>
          </div>

          <div className="flex h-10 gap-[8px]">
            <button
              type="button"
              className={cn(
                'flex justify-center items-center grow py-[10px] text-buttons transition',
                {
                  'bg-primary text-white hover:shadow-[0_3px_13px_0] hover:shadow-hover-bs': true,
                  'bg-white text-green shadow-inner shadow-elements hover:shadow-primary': false,
                },
              )}
            >
              Add to cart
            </button>

            <button
              className={cn(
                'aspect-square p-3 shadow-inner transition hover:shadow-primary',
                {
                  'shadow-icons': true,
                  'shadow-elements': false,
                },
              )}
            >
              {true ? (
                <Favourites className="fill-primary" />
              ) : (
                <FavouritesFilled className="fill-red" />
              )}
            </button>
          </div>

          <table className="block mt-[32px]">
            <tbody className="flex flex-col gap-y-[8px]">
              <tr className="flex justify-between">
                <td className="text-body text-secondary">Screen</td>
                <td className="text-body text-primary">{screen}</td>
              </tr>
              <tr className="flex justify-between">
                <td className="text-body text-secondary">Resolution</td>
                <td className="text-body text-primary">{resolution}</td>
              </tr>
              <tr className="flex justify-between">
                <td className="text-body text-secondary">Processor</td>
                <td className="text-body text-primary">{processor}</td>
              </tr>
              <tr className="flex justify-between">
                <td className="text-body text-secondary">RAM</td>
                <td className="text-body text-primary">{ram}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <section className="sm:col-span-12 mt-[56px] sm:mt-[64px] xl:mt-[80px]">
          <h3 className="pb-[16px] text-h3 text-primary shadow-down shadow-elements">
            About
          </h3>

          {description.map(part => (
            <div key={part.title} className="mt-[32px]">
              <h4 className="text-primary">{part.title}</h4>
              <p className="text-body text-secondary">{part.text}</p>
            </div>
          ))}
        </section>

        <section className="sm:col-span-12 xl:col-span-11 xl:col-start-14 mt-[56px] sm:mt-[64px] xl:mt-[80px]">
          <h3 className="pb-[16px] text-h3 text-primary shadow-down shadow-elements">
            Tech specs
          </h3>

          <div className="w-full mt-[16px] shadow-down shadow-elements content-['']"></div>

          <table className="block mt-[24px]">
            <tbody className="flex flex-col gap-y-[8px]">
              <tr className="flex justify-between">
                <td className="text-body text-secondary">Screen</td>
                <td className="text-body text-primary">{screen}</td>
              </tr>
              <tr className="flex justify-between">
                <td className="text-body text-secondary">Resolution</td>
                <td className="text-body text-primary">{resolution}</td>
              </tr>
              <tr className="flex justify-between">
                <td className="text-body text-secondary">Processor</td>
                <td className="text-body text-primary">{processor}</td>
              </tr>
              <tr className="flex justify-between">
                <td className="text-body text-secondary">RAM</td>
                <td className="text-body text-primary">{ram}</td>
              </tr>
              <tr className="flex justify-between">
                <td className="text-body text-secondary">Built in memory</td>
                <td className="text-body text-primary">{capacity}</td>
              </tr>
              <tr className="flex justify-between">
                <td className="text-body text-secondary">Camera</td>
                <td className="text-body text-primary"></td>
              </tr>
              <tr className="flex justify-between">
                <td className="text-body text-secondary">Zoom</td>
                <td className="text-body text-primary"></td>
              </tr>
              <tr className="flex justify-between">
                <td className="text-body text-secondary">Cell</td>
                <td className="text-body text-primary">{cell}</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/*<ProductsSlider*/}
        {/*  title="You may also like"*/}
        {/*  products={products}*/}
        {/*  className="mt-[56px] sm:mt-[64px] xl:mt-[80px]"*/}
        {/*/>*/}
      </div>
    </div>
  );
};
