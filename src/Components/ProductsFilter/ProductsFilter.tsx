import { useContext } from 'react';
import { FilterType } from '../types/FilterType';
import filter from './ProductsFilter.module.scss';
import { CatalogContext } from '../CatalogProvider';
import { ItemPerPage } from '../types/ItemPerPage';
import { SetURLSearchParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  queries: string;
  setParams: SetURLSearchParams;
  sort: string;
  perPage: string;
};

export const ProductsFilter = ({
  queries,
  setParams,
  sort,
  perPage,
}: Props) => {
  const { setSlideDots, setSlidePages, setPageNumber, themeSwitcher } =
    useContext(CatalogContext);

  return (
    <div
      className={filter.productsfilter}
      data-theme={themeSwitcher ? 'dark' : 'light'}
    >
      <div className={filter.query}>
        <label htmlFor="sortby" className={filter.text}>
          Search item
        </label>

        <input
          type="text"
          className={filter.input}
          placeholder="search item..."
          onChange={e => {
            setParams(prev => {
              prev.set('query', e.target.value);

              return prev;
            });

            setSlideDots(0);
            setSlidePages(0);
            setPageNumber(1);
          }}
          value={queries}
        />
      </div>

      <div className={filter.filters}>
        <div className={filter.filter}>
          <label htmlFor="sortby" className={filter.text}>
            Sort by
          </label>
          <select
            id="sortby"
            className={filter.selection}
            onChange={e => {
              setParams(prev => {
                prev.set('sort', e.target.value as FilterType);

                return prev;
              });
              setSlidePages(0);
              setSlideDots(0);
              setPageNumber(1);
            }}
            value={sort}
          >
            <option className={filter.productsfilterdisabled} disabled>
              Select filter
            </option>
            <option
              className={filter.option}
              value={FilterType.Allphabetically}
            >
              Allphabetically
            </option>
            <option
              value={FilterType.AllphabeticallyDescending}
              className={filter.option}
            >
              Allphabetically Descending
            </option>
            <option className={filter.option}>The newest</option>
            <option
              className={filter.option}
              value={FilterType.TheMostExpensive}
            >
              The most expensive
            </option>
            <option className={filter.option} value={FilterType.TheCheapest}>
              The cheapest
            </option>
            <option value={FilterType.TheNewest} className={filter.option}>
              The newest
            </option>
            <option value={FilterType.TheOldest} className={filter.option}>
              The oldest
            </option>
            <option disabled className={filter.productsfilterdisabled}>
              Colors:
            </option>
            <option className={filter.option} value={FilterType.GoldColor}>
              Gold color
            </option>
            <option className={filter.option} value={FilterType.GraphiteColor}>
              Graphite color
            </option>
            <option
              className={filter.option}
              value={FilterType.SierrablueColor}
            >
              Sierrablue color
            </option>
            <option className={filter.option} value={FilterType.BlackColor}>
              Black color
            </option>
            <option
              className={filter.option}
              value={FilterType.SpaceBlackColor}
            >
              {' '}
              Spaceblack color
            </option>
            <option className={filter.option} value={FilterType.RedGoldColor}>
              Redgold color
            </option>
            <option value={FilterType.WhiteColor} className={filter.option}>
              White color
            </option>
            <option value={FilterType.YellowColor} className={filter.option}>
              Yellow color
            </option>
            <option value={FilterType.RedColor} className={filter.option}>
              Red color
            </option>
            <option disabled className={filter.productsfilterdisabled}>
              Capacities:
            </option>
            <option value={FilterType.Capacity_32_GB} className={filter.option}>
              Capacity: 32GB
            </option>
            <option value={FilterType.Capacity_64_GB} className={filter.option}>
              Capacity: 64GB
            </option>
            <option
              className={filter.option}
              value={FilterType.Capacity_128_GB}
            >
              Capacity: 128GB
            </option>
            <option
              className={filter.option}
              value={FilterType.Capacity_256_GB}
            >
              Capacity: 256GB
            </option>
            <option
              className={filter.option}
              value={FilterType.Capacity_512_GB}
            >
              Capacity: 512GB
            </option>
            <option className={filter.option} value={FilterType.Capacity_1_TB}>
              Capacity: 1TB
            </option>
          </select>
        </div>
        <div className={filter.filter}>
          <label htmlFor="sortby" className={filter.text}>
            Item on page
          </label>
          <select
            name=""
            id=""
            className={filter.selection}
            onChange={e => {
              setParams(prev => {
                prev.set('perPage', e.target.value.toString());

                return prev;
              });
              setSlideDots(0);
              setSlidePages(0);
              setPageNumber(1);
            }}
            value={parseInt(perPage)}
          >
            <option value="all" className={filter.option}>
              All
            </option>
            <option
              value={ItemPerPage.SIXTEEN_PER_PAGE}
              className={filter.option}
            >
              16
            </option>
            <option
              value={ItemPerPage.EIGHT_PER_PAGE}
              className={filter.option}
            >
              8
            </option>
            <option value={ItemPerPage.FOUR_PER_PAGE} className={filter.option}>
              4
            </option>
            <option value={ItemPerPage.TWO_PER_PAGE} className={filter.option}>
              2
            </option>
          </select>
        </div>
        <div
          className={classNames([filter.glass], {
            [filter.glassONDARK]: themeSwitcher,
          })}
        />
      </div>
      <div
        className={classNames([filter.glassONPHONE], {
          [filter.glassONPHONEONDARK]: themeSwitcher,
        })}
      />
    </div>
  );
};
