import { useContext } from 'react';
import { FilterType } from '../types/FilterType';
import './ProductsFilter.scss';
import { CatalogContext } from '../CatalogProvider';

export const ProductsFilter = () => {
  const { setFilter } = useContext(CatalogContext);

  return (
    <div className="productsfilter">
      <label htmlFor="sortby" className="productsfilter__text">
        Sort by
      </label>
      <select
        id="sortby"
        className="productsfilter__selection"
        onChange={e => setFilter(e.target.value as FilterType)}
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
        <option value={FilterType.TheNewest} className="productsfilter__option">
          The newest
        </option>
        <option value={FilterType.TheOldest} className="productsfilter__option">
          The oldest
        </option>
        <option disabled className="productsfilter__option--disabled">
          Colors:
        </option>
        <option className="productsfilter__option" value={FilterType.GoldColor}>
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
        <option value={FilterType.RedColor} className="productsfilter__option">
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
  );
};
