import { Phone } from '../interface/Product';

interface ProductParagraphsProps {
  realProduct: Phone;
}

const ProductParagraphs = ({ realProduct }: ProductParagraphsProps) => {
  return (
    <div className="product__paragraphs">
      <div className="product__column">
        <div className="product__specs">
          <h2 className="product__title">Tech specs</h2>
          <table className="product__spectable">
            <tr>
              <td>Screen</td>
              <td>{realProduct.screen}</td>
            </tr>
            <tr>
              <td>Resolution</td>
              <td>{realProduct.resolution}</td>
            </tr>
            <tr>
              <td>Processor</td>
              <td>{realProduct.processor}</td>
            </tr>
            <tr>
              <td>RAM</td>
              <td>{realProduct.ram}</td>
            </tr>
            <tr>
              <td>Built in memory</td>
              <td>{realProduct.capacity}</td>
            </tr>
            <tr>
              <td>Camera</td>
              <td>{realProduct.camera}</td>
            </tr>
            <tr>
              <td>Zoom</td>
              <td>{realProduct.zoom}</td>
            </tr>
            <tr>
              <td>Cell</td>
              <td>{realProduct.cell}</td>
            </tr>
          </table>
        </div>
      </div>
      <div className="product__column">
        <div className="product__about">
          <h2 className="product__title">About</h2>
          <div className="product__text">
            {realProduct.description?.map(
              (text: { title: string; text: string[] }, i: number) => {
                return (
                  <div key={i}>
                    <h3 className="product__subtitle">{text.title}</h3>
                    {text.text.map((paragraph, j) => (
                      <p key={j} className="product__paragraph">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                );
              },
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductParagraphs;
