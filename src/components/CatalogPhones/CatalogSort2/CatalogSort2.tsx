type CatalogSort2Props = {
  IsPageOpen: boolean;
  setIsPageOpen: React.Dispatch<React.SetStateAction<boolean>>;
  itemsPerPage: number | 'all';
  setItemsPerPage: React.Dispatch<React.SetStateAction<number | 'all'>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const CatalogSort2 = ({
  IsPageOpen,
  setIsPageOpen,
  itemsPerPage,
  setItemsPerPage,
  setCurrentPage,
}: CatalogSort2Props) => {
  return (
    <>
      <div className="catalog__select">
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
                  setItemsPerPage(value as number | 'all');
                  setCurrentPage(1);
                  setIsPageOpen(false);
                }}
              >
                {value === 'all' ? 'All' : value}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CatalogSort2;
