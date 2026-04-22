import './CatalogSlider.scss';

type CatalogSliderProps = {
  currentPage: number;
  setCurrentPage: (value: number) => void;
  visiblePageButtons: number[];
  totalPages: number;
};

const CatalogSlider = ({
  currentPage,
  setCurrentPage,
  visiblePageButtons,
  totalPages,
}: CatalogSliderProps) => {
  return (
    <>
      <div className="catalog__sliders">
        <button
          className="catalog__slider--left--icon"
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        />

        {visiblePageButtons.map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`catalog__slider--number ${
              currentPage === page ? 'catalog__slider--number--active' : ''
            }`}
          >
            {page}
          </button>
        ))}

        <button
          className="catalog__slider--right--icon"
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
        />
      </div>
    </>
  );
};

export default CatalogSlider;
