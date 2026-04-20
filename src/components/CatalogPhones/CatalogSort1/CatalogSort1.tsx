import './CatalogSort1.scss';

type CatalogSort1Props = {
  sortType: 'newest' | 'oldest';
  setSortType: React.Dispatch<React.SetStateAction<'newest' | 'oldest'>>;
  IsSortOpen: boolean;
  setIsSortOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CatalogSort1 = ({
  sortType,
  setSortType,
  IsSortOpen,
  setIsSortOpen,
}: CatalogSort1Props) => {
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
            {sortType === 'newest' ? 'Newest' : 'Oldest'}
          </div>

          {IsSortOpen && (
            <div className="catalog__select--options">
              <div
                className="catalog__option"
                onClick={() => {
                  setSortType('newest');
                  setIsSortOpen(false);
                }}
              >
                Newest
              </div>

              <div
                className="catalog__option"
                onClick={() => {
                  setSortType('oldest');
                  setIsSortOpen(false);
                }}
              >
                Oldest
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CatalogSort1;
