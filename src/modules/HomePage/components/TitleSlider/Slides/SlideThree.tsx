/* eslint-disable max-len */
import { useAppSelector } from '../../../../../app/hooks';
import { AnimatedLayout } from '../../../../shared/Shared_Components/AnimatedComponents/AnimatedLayout';

export const SlideThree = () => {
  const direction = useAppSelector(state => state.directionReducer);

  return (
    <AnimatedLayout direction={direction}>
      <div className="slider__slide slider__slide--3" />
    </AnimatedLayout>
  );
};
