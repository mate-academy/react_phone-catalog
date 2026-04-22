import './CatalogSort1.scss';

type CatalogSort1Props = {
  sortType: 'newest' | 'oldest' | 'mostExpensive' | 'cheapest';
  handleSortChange: (
    value: 'newest' | 'oldest' | 'mostExpensive' | 'cheapest',
  ) => void;
  IsSortOpen: boolean;
  setIsSortOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CatalogSort1 = ({
  sortType,
  handleSortChange,
  IsSortOpen,
  setIsSortOpen,
}: CatalogSort1Props) => {
  const getSortLabel = () => {
    switch (sortType) {
      case 'newest':
        return 'Newest';
      case 'oldest':
        return 'Oldest';
      case 'mostExpensive':
        return 'Most expensive';
      case 'cheapest':
        return 'Cheapest';
      default:
        return 'Select';
    }
  };

  return (
    <>
      <div className="catalog__sort catalog__sort--1">
        <label className="catalog__title--sort" htmlFor="sort">
          Sort by
        </label>
        <div className="catalog__select">
          <div
            className="catalog__select--selected"
            onClick={() => setIsSortOpen(prev => !prev)}
          >
            {getSortLabel()}
          </div>

          {IsSortOpen && (
            <div className="catalog__select--options">
              <div
                className="catalog__option"
                onClick={() => {
                  handleSortChange('newest');
                  setIsSortOpen(false);
                }}
              >
                Newest
              </div>

              <div
                className="catalog__option"
                onClick={() => {
                  handleSortChange('oldest');
                  setIsSortOpen(false);
                }}
              >
                Oldest
              </div>

              <div
                className="catalog__option"
                onClick={() => {
                  handleSortChange('mostExpensive');
                  setIsSortOpen(false);
                }}
              >
                Most Expensive
              </div>

              <div
                className="catalog__option"
                onClick={() => {
                  handleSortChange('cheapest');
                  setIsSortOpen(false);
                }}
              >
                Cheapest
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CatalogSort1;
