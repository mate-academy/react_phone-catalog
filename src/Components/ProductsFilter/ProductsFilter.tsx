import { useContext } from 'react';
import { FilterType } from '../types/FilterType';
import './ProductsFilter.module.scss';
import { CatalogContext } from '../CatalogProvider';
import { ItemPerPage } from '../types/ItemPerPage';
import { SetURLSearchParams } from 'react-router-dom';

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
  const { setSlideDots, setSlidePages, setPageNumber } =
    useContext(CatalogContext);

  return (
    <div className="productsfilter">
      <div className="productsfilter__query">
        <label htmlFor="sortby" className="productsfilter__text">
          Search item
        </label>

        <input
          type="text"
          className="productsfilter__input"
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

      <div className="productsfilter__filters">
        <div className="productsfilter__filter">
          <label htmlFor="sortby" className="productsfilter__text">
            Sort by
          </label>
          <select
            id="sortby"
            className="productsfilter__selection"
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
            <option className="productsfilter__option--disabled" disabled>
              Select filter
            </option>
            <option
              className="productsfilter__option"
              value={FilterType.Allphabetically}
            >
              Allphabetically
            </option>
            <option
              value={FilterType.AllphabeticallyDescending}
              className="productsfilter__option"
            >
              Allphabetically Descending
            </option>
            <option className="productsfilter__option">The newest</option>
            <option
              className="productsfilter__option"
              value={FilterType.TheMostExpensive}
            >
              The most expensive
            </option>
            <option
              className="productsfilter__option"
              value={FilterType.TheCheapest}
            >
              The cheapest
            </option>
            <option
              value={FilterType.TheNewest}
              className="productsfilter__option"
            >
              The newest
            </option>
            <option
              value={FilterType.TheOldest}
              className="productsfilter__option"
            >
              The oldest
            </option>
            <option disabled className="productsfilter__option--disabled">
              Colors:
            </option>
            <option
              className="productsfilter__option"
              value={FilterType.GoldColor}
            >
              Gold color
            </option>
            <option
              className="productsfilter__option"
              value={FilterType.GraphiteColor}
            >
              Graphite color
            </option>
            <option
              className="productsfilter__option"
              value={FilterType.SierrablueColor}
            >
              Sierrablue color
            </option>
            <option
              className="productsfilter__option"
              value={FilterType.BlackColor}
            >
              Black color
            </option>
            <option
              className="productsfilter__option"
              value={FilterType.SpaceBlackColor}
            >
              {' '}
              Spaceblack color
            </option>
            <option
              className="productsfilter__option"
              value={FilterType.RedGoldColor}
            >
              Redgold color
            </option>
            <option
              value={FilterType.WhiteColor}
              className="productsfilter__option"
            >
              White color
            </option>
            <option
              value={FilterType.YellowColor}
              className="productsfilter__option"
            >
              Yellow color
            </option>
            <option
              value={FilterType.RedColor}
              className="productsfilter__option"
            >
              Red color
            </option>
            <option disabled className="productsfilter__option--disabled">
              Capacities:
            </option>
            <option
              value={FilterType.Capacity_32_GB}
              className="productsfilter__option"
            >
              Capacity: 32GB
            </option>
            <option
              value={FilterType.Capacity_64_GB}
              className="productsfilter__option"
            >
              Capacity: 64GB
            </option>
            <option
              className="productsfilter__option"
              value={FilterType.Capacity_128_GB}
            >
              Capacity: 128GB
            </option>
            <option
              className="productsfilter__option"
              value={FilterType.Capacity_256_GB}
            >
              Capacity: 256GB
            </option>
            <option
              className="productsfilter__option"
              value={FilterType.Capacity_512_GB}
            >
              Capacity: 512GB
            </option>
            <option
              className="productsfilter__option"
              value={FilterType.Capacity_1_TB}
            >
              Capacity: 1TB
            </option>
          </select>
        </div>
        <div className="productsfilter__filter">
          <label htmlFor="sortby" className="productsfilter__text">
            Item on page
          </label>
          <select
            name=""
            id=""
            className="productsfilter__selection"
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
            <option value="all" className="productsfilter__option">
              All
            </option>
            <option
              value={ItemPerPage.SIXTEEN_PER_PAGE}
              className="productsfilter__option"
            >
              16
            </option>
            <option
              value={ItemPerPage.EIGHT_PER_PAGE}
              className="productsfilter__option"
            >
              8
            </option>
            <option
              value={ItemPerPage.FOUR_PER_PAGE}
              className="productsfilter__option"
            >
              4
            </option>
            <option
              value={ItemPerPage.TWO_PER_PAGE}
              className="productsfilter__option"
            >
              2
            </option>
          </select>
        </div>
        <div className="productsfilter__glass" />
      </div>
      <div className="productsfilter__glassONPHONE" />
    </div>
  );
};
