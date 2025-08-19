import { Slider } from '../../../../components/ProductSlider/Slider';
import { useProducts } from '../../../../shared/context/ProductsContext';

export const NewModels = () => {
  const { newModels } = useProducts();
  const NewModelsTitle = 'Brand New Models';

  return <Slider products={newModels} title={NewModelsTitle} />;
};
