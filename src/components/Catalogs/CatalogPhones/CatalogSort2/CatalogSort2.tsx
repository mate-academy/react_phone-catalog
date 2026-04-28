type CatalogSort2Props = {
  IsPageOpen: boolean;
  setIsPageOpen: React.Dispatch<React.SetStateAction<boolean>>;
  itemsPerPage: number | 'all';
  handleItemsChange: (value: number | 'all') => void;
};

const CatalogSort2 = ({
  IsPageOpen,
  setIsPageOpen,
  itemsPerPage,
  handleItemsChange,
}: CatalogSort2Props) => {
  return (
    <>
      <div className="catalog__sort catalog__sort--2">
        <label className="catalog__title--sort" htmlFor="items-per-page">
          Items on page
        </label>
        <div className={`catalog__select ${IsPageOpen ? 'active' : ''}`}>
          <div
            className="catalog__select--selected"
            onClick={() => setIsPageOpen(prev => !prev)}
          >
            {itemsPerPage === 'all' ? 'All' : itemsPerPage}
          </div>
          {IsPageOpen && (
            <div className="catalog__select--options">
              {[4, 8, 16, 'all'].map(value => (
                <div
                  key={value}
                  className="catalog__option"
                  onClick={() => {
                    handleItemsChange(value as number | 'all');
                    setIsPageOpen(false);
                  }}
                >
                  {value === 'all' ? 'All' : value}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CatalogSort2;
