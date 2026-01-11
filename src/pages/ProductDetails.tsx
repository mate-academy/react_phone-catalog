import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import cn from 'clsx';
import { useGetProductsQuery } from '../services/productsApi';
import { useGetProductsByCategoryQuery } from '../services/productDetailsApi';
import { selectAllProducts } from '../selectors/productsSelectors';
import { selectProductDetailsById } from '../selectors/productDetailsSelectors';
import { BackButton } from '../components/BackButton';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PhotoSlider } from '../components/PhotoSlider';
import { ProductsSlider } from '../components/ProductsSlider';
import Favourites from '/src/assets/icons/favourites.svg?react';
import FavouritesFilled from '/src/assets/icons/favourites-filled.svg?react';
import type { RootState } from '../store';
import { ProductDetails } from '../types';
import { cartSelectors } from '../selectors/cartSelectors';
import { cartActions } from '../features/cartSlice';
import { favouritesSelectors } from '../selectors/favouritesSelectors';
import { favouritesActions } from '../features/favouritesSlice';
import { Button } from '../components/Button';

export const ProductDetailsPage: FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const dispatch = useDispatch();
  const { isLoading: isSummaryLoading } = useGetProductsQuery();
  const allProducts = useSelector(selectAllProducts);
  const randomProducts = [...allProducts].sort(() => Math.random() - 0.5);

  const product = useMemo(
    () => allProducts.find(p => p.itemId === itemId),
    [allProducts, itemId],
  );

  const isInCart = useSelector(
    (state: RootState) => itemId && cartSelectors.selectById(state, itemId),
  );

  const handleAddToCart = () => {
    return product && dispatch(cartActions.addToCart(product));
  };

  const isFavourite = useSelector(
    (state: RootState) =>
      itemId && favouritesSelectors.selectById(state, itemId),
  );

  const handleToggleFavourite = () => {
    return product && dispatch(favouritesActions.toggleFavourite(product));
  };

  const category = product?.category;

  const { isLoading: isDetailsLoading } = useGetProductsByCategoryQuery(
    category!,
    { skip: !category },
  );

  const productDetails = useSelector((state: RootState) =>
    category && itemId
      ? selectProductDetailsById(state, category, itemId)
      : null,
  );

  if (isSummaryLoading || isDetailsLoading) {
    return <h1 className="text-h1">Loading...</h1>;
  }

  if (!itemId || !product || !productDetails) {
    return <h1 className="text-h1">Product not found!</h1>;
  }

  const {
    name,
    namespaceId,
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
    images,
  } = productDetails;

  const formatLink = ({
    namespaceId: nam,
    capacity: cap,
    color: col,
  }: Pick<ProductDetails, 'namespaceId' | 'capacity' | 'color'>) => {
    return `/product/${nam}-${cap}-${col}`.toLowerCase();
  };

  return (
    <div className="pb-14 sm:pb-16 xl:pb-20">
      <Breadcrumbs
        routes={[
          {
            path: '/product',
            breadcrumb:
              category && category[0].toUpperCase() + category.slice(1),
            linkTo: `/${category}`,
          },
          { path: '/product/:itemId', breadcrumb: name },
        ]}
        className="mt-6"
      />

      <BackButton className="mt-10" />

      <h1 className="mt-4 text-h1">{name}</h1>

      <div className="sm:pageGrid mt-8 sm:mt-10">
        <PhotoSlider images={images} className="sm:col-span-7 xl:col-span-12" />

        <div className="sm:col-span-5 sm:col-start-8 xl:col-span-7 xl:col-start-14">
          <div className="flex flex-col pb-6 shadow-down shadow-elements">
            <div className="text-small text-secondary">Available colors</div>
            <ul className="flex gap-2 mt-2">
              {colorsAvailable.map(value => (
                <li key={value}>
                  <NavLink
                    to={formatLink({
                      namespaceId,
                      capacity,
                      color: value,
                    })}
                    className={cn(
                      'flex justify-center items-center size-8 rounded-full border-2 border-white shadow-inner shadow-elements',
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
                  ></NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col mt-6 pb-6 shadow-down shadow-elements">
            <div className="text-small text-secondary">Select capacity</div>
            <ul className="flex gap-2 mt-2">
              {capacityAvailable.map(value => (
                <li key={value}>
                  <NavLink
                    to={formatLink({
                      namespaceId,
                      capacity: value,
                      color,
                    })}
                    className={cn(
                      'flex justify-center items-center h-8 px-2 shadow-inner shadow-icons',
                      {
                        'bg-primary shadow-primary text-white':
                          capacity === value,
                      },
                    )}
                  >
                    {value}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2 mt-8">
            <h2 className="text-h3 text-primary">${priceDiscount}</h2>

            <span className="line-through text-secondary">${priceRegular}</span>
          </div>

          <div className="flex h-10 gap-2">
            <Button
              onClick={handleAddToCart}
              className={cn(
                'flex justify-center items-center grow py-2.5 text-buttons transition',
                {
                  'bg-primary text-white hover:shadow-[0_3px_13px_0] hover:shadow-hover-bs': true,
                  'bg-white text-green shadow-inner shadow-elements hover:shadow-primary': false,
                },
              )}
            >
              {isInCart ? 'Added to cart' : 'Add to cart'}
            </Button>

            <Button
              onClick={handleToggleFavourite}
              className={cn(
                'aspect-square p-3 shadow-inner transition hover:shadow-primary',
                {
                  'shadow-icons': true,
                  'shadow-elements': false,
                },
              )}
            >
              {isFavourite ? (
                <FavouritesFilled className="fill-red" />
              ) : (
                <Favourites className="fill-primary" />
              )}
            </Button>
          </div>

          <table className="block mt-8">
            <tbody className="flex flex-col gap-2">
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

        <section className="sm:col-span-12 mt-14 sm:mt-16 xl:mt-20">
          <h3 className="pb-4 text-h3 text-primary shadow-down shadow-elements">
            About
          </h3>

          {description.map(part => (
            <div key={part.title} className="mt-8">
              <h4 className="text-primary">{part.title}</h4>
              <p className="text-body text-secondary">{part.text}</p>
            </div>
          ))}
        </section>

        <section className="sm:col-span-12 xl:col-span-11 xl:col-start-14 mt-14 sm:mt-16 xl:mt-20">
          <h3 className="pb-4 text-h3 text-primary shadow-down shadow-elements">
            Tech specs
          </h3>

          <div className="w-full mt-4 shadow-down shadow-elements content-['']"></div>

          <table className="block mt-6">
            <tbody className="flex flex-col gap-2">
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
                <td className="text-body text-primary">{}</td>
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
      </div>

      <ProductsSlider
        title="You may also like"
        products={randomProducts}
        className="mt-14 sm:mt-16 xl:mt-20"
      />
    </div>
  );
};
