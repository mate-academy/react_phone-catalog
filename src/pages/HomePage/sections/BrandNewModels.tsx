import { CustomSlider } from 'components/CustomSlider';
import { NewModelCard } from 'components/NewModelCard';
import { FC } from 'react';
import { Product } from 'types/Product';

type Props = {
  newModels: Product[],
};

export const BrandNewModels: FC<Props> = ({ newModels }) => {
  return (
    <div className="new-models phones-section">
      <div className="new-model__title">
        <h1>Brand new models</h1>
      </div>

      <div data-cy="cardsContainer" className="new-model__catalog">
        <CustomSlider>
          {newModels.map((newModel) => {
            return <NewModelCard key={newModel.id} newModel={newModel} />;
          })}
        </CustomSlider>
      </div>
    </div>
  );
};
