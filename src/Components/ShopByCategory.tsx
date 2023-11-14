/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import { typographyStyle } from '../CustomStyles/Typography';

export const ShopByCategory = () => {
  return (
    <>
      <h2 className={`col-span-6  ${typographyStyle.h1}`}>
        Shop by category
      </h2>

      <hr className="col-span-full h-[24px] border-0" />

      <div className="col-span-12  flex gap-x-4">
        <Link to="phones">
          <div
            className="mb-6  h-[368px] w-[368px] bg-[#FCDBC1] bg-right-bottom bg-no-repeat"
            style={{
              backgroundImage: 'url(/assets/img/phone.png)',
            }}
          />
          <h3 className={`mb-1 ${typographyStyle.h3}`}>Mobile phones</h3>
          <p className={`text-Secondary ${typographyStyle.bodyText}`}>
            95 models
          </p>
        </Link>

        <Link to="tablets">
          <div
            className="mb-6 block h-[368px] w-[368px] bg-[#8D8D92] bg-right-bottom bg-no-repeat"
            style={{
              backgroundImage: 'url(/assets/img/tablet.png)',
            }}
          />
          <h3 className={`mb-1 ${typographyStyle.h3}`}>Tablets</h3>
          <p className={`text-Secondary ${typographyStyle.bodyText}`}>
            24 models
          </p>
        </Link>

        <Link to="accessories">
          <div
            className="mb-6 block h-[368px] w-[368px] bg-[#973D5F] bg-right-bottom bg-no-repeat"
            style={{
              backgroundImage: 'url(/assets/img/accessory.png)',
            }}
          />
          <h3 className={`mb-1 ${typographyStyle.h3}`}>Accessories</h3>
          <p className={`text-Secondary ${typographyStyle.bodyText}`}>
            100 models
          </p>
        </Link>
      </div>
    </>
  );
};
