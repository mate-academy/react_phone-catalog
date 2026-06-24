import './CatalogSlider.scss';

type CatalogSliderProps = {
  currentPage: number;
  handlePageChange: (page: number) => void;
  visiblePageButtons: number[];
  totalPages: number;
};

const CatalogSlider = ({
  currentPage,
  handlePageChange,
  visiblePageButtons,
  totalPages,
}: CatalogSliderProps) => {
  return (
    <>
      <div className="catalog__sliders">
        <button
          className="catalog__slider--left--icon"
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
        />

        {visiblePageButtons.map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`catalog__slider--number ${
              currentPage === page ? 'catalog__slider--number--active' : ''
            }`}
          >
            {page}
          </button>
        ))}

        <button
          className="catalog__slider--right--icon"
          onClick={() =>
            handlePageChange(Math.min(currentPage + 1, totalPages))
          }
        />
      </div>
    </>
  );
};

export default CatalogSlider;
