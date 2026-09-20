import { ProductType } from '../../../../../shared/types/ProductType';

type CaracteristiquesType = {
  products: ProductType;
};
export const Caracteristiques = ({ products }: CaracteristiquesType) => {
  return (
    <section className="details-caracteristiques">
      <h3 className="details-section-title">Tech specs</h3>
      <section className="caracteristiques-wrapper">
        <div className="card-props props-table">
          <p className="card-props-line">
            <span className="card-props-line-title">Screen</span>
            <span>{products.screen}</span>
          </p>

          <p className="card-props-line">
            <span className="card-props-line-title">Resolution</span>
            <span>{products.resolution}</span>
          </p>

          <p className="card-props-line">
            <span className="card-props-line-title">Processor</span>
            <span>{products.processor}</span>
          </p>

          <p className="card-props-line">
            <span className="card-props-line-title">RAM</span>
            <span>{products.ram}</span>
          </p>
          {products.category === 'phones' || products.category === 'tablets' ? (
            <>
              <p className="card-props-line">
                <span className="card-props-line-title">Built in memory</span>
                <span>{products.capacity}</span>
              </p>

              <p className="card-props-line">
                <span className="card-props-line-title">Camera</span>
                <span>{products.camera}</span>
              </p>

              <p className="card-props-line">
                <span className="card-props-line-title">Zoom</span>
                <span>{products.zoom}</span>
              </p>

              <p className="card-props-line">
                <span className="card-props-line-title">Cell</span>
                <span>
                  {Array.isArray(products.cell)
                    ? products.cell.join(', ')
                    : products.cell}
                </span>
              </p>
            </>
          ) : (
            ''
          )}

          {/* <div className="card-props-left props-table-label">
                            {products.category === 'phones' || products.category === 'tablets' ? 
                                <>
                                </>    
                            : ""}

                                <p>Cell</p>
                            </div>
                            <div className="card-props-right props-table-label">
                            {products.category === 'phones' || products.category === 'tablets' ? 
                                <>
                                    <p>{products.zoom}</p>
                                </>    
                            : ""}

                            </div> */}
        </div>
      </section>
    </section>
  );
};
