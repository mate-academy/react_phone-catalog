import { useContext } from 'react';
import { StatesContext } from '../../store/GlobalStateProvider';
import { Line } from '../base/Line/Line.component';

export const ProductDetailsDescription = () => {
  const { selectedProduct } = useContext(StatesContext);

  if (selectedProduct) {
    return (
      <div className="productDetailsDescription">
        <div className="productDetailsDescription__header">
          <h3>About</h3>
          <Line />
        </div>
        {selectedProduct.description.map((desc, idx) => (
          <div className="productDetailsDescription__desc" key={idx}>
            <h4>{desc.title}</h4>
            {desc.text.map((t, i) => (
              <span className="productDetailsDescription__text" key={i}>
                {t}
              </span>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return 'selectedProduct not found';
};
