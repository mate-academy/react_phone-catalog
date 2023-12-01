/* eslint-disable max-len */
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { typographyStyle } from '../CustomStyles/Typography';
import { appContext } from '../Contexts/AppContext';

export const ShopByCategory = () => {
  const { products } = useContext(appContext);

  return (
    <>
      <h2 className={`col-span-6  ${typographyStyle.h1}`}>Shop by category</h2>

      <hr className="col-span-full h-[24px] border-0" />

      <div className="col-span-12  flex gap-x-4">
        <Link to="catalogue/phones">
          <div
            className={classNames(
              'bg-phone-ctg mb-6 h-[368px] w-[368px] bg-[#FCDBC1] bg-right-bottom bg-no-repeat',
            )}
          />
          <h3 className={`mb-1 ${typographyStyle.h3}`}>Mobile phones</h3>
          <p className={`text-Secondary ${typographyStyle.bodyText}`}>
            {`${products.length} ${products.length === 1 ? 'model' : 'models'}`}
          </p>
        </Link>

        <Link to="catalogue/tablets">
          <div className="bg-tablet-ctg mb-6 h-[368px] w-[368px] bg-[#8D8D92] bg-right-bottom bg-no-repeat" />
          <h3 className={`mb-1 ${typographyStyle.h3}`}>Tablets</h3>
          <p className={`text-Secondary ${typographyStyle.bodyText}`}>
            24 models
          </p>
        </Link>

        <Link to="catalogue/accessories">
          <div className="bg-accessory-ctg mb-6 h-[368px] w-[368px] bg-[#973D5F] bg-right-bottom bg-no-repeat" />
          <h3 className={`mb-1 ${typographyStyle.h3}`}>Accessories</h3>
          <p className={`text-Secondary ${typographyStyle.bodyText}`}>
            100 models
          </p>
        </Link>
      </div>
    </>
  );
};
