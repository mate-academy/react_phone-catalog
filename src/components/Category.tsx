import { useEffect } from 'react';
import { IMAGES_FOR_CATEGORY } from '../utils/ImagesForCategory';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import * as phonesActions from '../features/phones';
import * as tabletsActions from '../features/tablets';
import * as accessoriesActions from '../features/accessories';

export const Category = () => {
  const dispatch = useAppDispatch();
  const { phones } = useAppSelector(state => state.phones);
  const { tablets } = useAppSelector(state => state.tablets);
  const { accessories } = useAppSelector(state => state.accessories);

  useEffect(() => {
    dispatch(phonesActions.init());
    dispatch(tabletsActions.init());
    dispatch(accessoriesActions.init());
  }, []);

  const phonesLength = phones.length;
  const tabletsLength = tablets.length;
  const accessoriesLength = accessories.length;

  return (
    <div className="mx-[16px] flex flex-col gap-[32px] sm:mx-0 sm:flex-row sm:gap-[16px]">
      {IMAGES_FOR_CATEGORY.map(image => (
        <Link to={image.path} key={image.id} className="h-full w-full">
          <div
            style={{ backgroundColor: image.bgColor }}
            className="
              relative 
              h-[288px] 
              w-full 
              overflow-hidden 
              rounded-[8px] 
              transition-[all] 
              duration-300 
              ease-in-out
              hover:scale-[1.05]
              sm:h-[187px]
              xl:h-[368px]
            "
          >
            <img
              src={image.src}
              alt={image.alt}
              className="
              absolute
              left-[15%]
              top-[27%]
              h-full
              w-full
              object-contain
            "
              style={(() => {
                if (image.title === 'Tablets')
                  return { transform: 'scale(1.4)', left: '31%', top: '34%' };
                if (image.title === 'Accessories')
                  return { transform: 'scale(1.7)', left: '50%', top: '11%' };
                return {};
              })()}
            />
          </div>

          <div className="mt-[24px] flex flex-col gap-[4px]">
            <h3 className="font-mont-semi text-[20px] leading-[25.56px] text-primary">
              {image.title}
            </h3>
            <p className="text-[14px] font-semibold leading-[21px] text-secondary">
              {(image.title === 'Mobile phones' && `${phonesLength} models`) ||
                (image.title === 'Tablets' && `${tabletsLength} models`) ||
                (image.title === 'Accessories' &&
                  `${accessoriesLength} models`)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
