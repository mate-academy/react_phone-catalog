/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import Select, { StylesConfig } from 'react-select';

import { typographyStyle } from '../CustomStyles/Typography';

export const Phones = () => {
  const customStyles: StylesConfig = {
    control: styles => ({
      ...styles,
      borderRadius: 0,
    }),
  };

  return (
    <>
      <hr className="col-span-full mb-6 border-0" />

      <div className="col-span-full flex h-4 items-center gap-x-2">
        <Link to="/">
          <img src="/Icons/Home.svg" alt="home" />
        </Link>

        <img src="/Icons/Chevron (Arrow Right).svg" alt="home" />

        <Link to="/phones">Phones</Link>
      </div>

      <hr className="col-span-full mb-10 border-0" />

      <h1 className={`col-span-full ${typographyStyle.h1}`}>Mobile phones</h1>
      <p className={`col-span-full text-Secondary ${typographyStyle.bodyText}`}>
        95 models
      </p>

      <hr className="col-span-full mb-10 border-0" />

      <form className="col-span-full flex">
        <div className="flex gap-x-4">
          <div className="flex flex-col gap-y-1">
            <label
              className={`block text-Secondary ${typographyStyle.smallText}`}
              id="aria-label"
              htmlFor="aria-example-input"
            >
              Sort by
            </label>

            <Select
              aria-labelledby="aria-label"
              inputId="aria-example-input"
              styles={customStyles}
              className="h-10 w-[176px] appearance-none  text-Primary"
              defaultValue={{ value: 'newest', label: 'Newest' }}
              options={[{ value: 'newest', label: 'Newest' }]}
            />
          </div>

          <div className="flex flex-col gap-y-1">
            <label
              className={`block text-Secondary ${typographyStyle.smallText}`}
              id="aria-label"
              htmlFor="aria-example-input"
            >
              Per page
            </label>

            <Select
              aria-labelledby="aria-label"
              inputId="aria-example-input"
              styles={customStyles}
              className="h-10 w-[128px] appearance-none  text-Primary"
              defaultValue={{ value: 16, label: '16' }}
              options={[
                { value: 8, label: '8' },
                { value: 16, label: '16' },
                { value: 32, label: '32' },
              ]}
            />
          </div>
        </div>
      </form>

      <hr className="col-span-full mb-6 border-0" />
    </>
  );
};
