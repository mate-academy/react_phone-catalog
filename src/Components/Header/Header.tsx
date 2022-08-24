import { SelectCustomString }
  from '../SelectCustom/SelectCustomString/SelectCustomString';
import { SelectCustomNumber }
  from '../SelectCustom/SelectCustomNumber/SelectCustomNumber';
import './Header.scss';

const sortBy = [
  ['age', 'Newest'],
  ['name', 'Alphabetically'],
  ['price', 'Cheapest'],
];

const pagination = [4, 8, 16];

export const Header = () => {
  return (
    <div className="Header">
      <div className="Header__route">
        <img
          className="Header__svg"
          src="./assets/Home.svg"
          alt="home-icon"
        />
        <img
          className="Header__svg"
          src="./assets/Chevron-arrow-right.svg"
          alt="arrow-right"
        />
        <h3 className="Header__routeText">
          Phones
        </h3>
      </div>
      <h1 className="Header__PageTitle">
        Mobile Header
      </h1>
      <h3 className="Header__foundNumber">
        95 models
      </h3>
      <div className="Header__selects">
        <div className="Header__select">
          <h3 className="Header__selectName">Sort by</h3>
          <SelectCustomString options={sortBy} />
        </div>
        <div className="Header__select">
          <h3 className="Header__selectName">Items on page</h3>
          <SelectCustomNumber options={pagination} />
        </div>
      </div>
    </div>
  );
};
