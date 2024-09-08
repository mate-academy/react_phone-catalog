import { memo, useMemo } from 'react';
import { TechSpecs, TechSpecsSize } from '../../../../../shared/ui/TechSpecs';
import { ProductDetails } from '../../../model/types/productDetails';
import cls from './aboutProductSection.module.scss';
import { TitleTag } from '../../../../../shared/ui/TitleTag';
import { DescriptionBlock } from '../../components/DescriptionBlock/DescriptionBlock';
import { Section } from '../../../../../shared/ui/Section';
import { Sceleton } from '../../../../../shared/ui/Sceleton/Sceleton';

interface Props {
  product: ProductDetails;
  isLoadind: boolean;
}

export const AboutProductSection = memo(({ product, isLoadind }: Props) => {
  const {
    screen,
    resolution,
    processor,
    ram,
    capacity,
    camera,
    zoom,
    cell,
    description,
  } = product;

  const techSpecs = {
    screen,
    resolution,
    processor,
    ram,
    capacity,
    camera,
    zoom,
    cell: cell.join(', '),
  };

  const descriptionList = useMemo(
    () =>
      description.map(item => (
        <DescriptionBlock key={item.title} description={item} />
      )),
    [description],
  );

  return (
    <Section>
      {isLoadind ? (
        <Sceleton width={'100%'} height={200} />
      ) : (
        <div className={cls.wrapper}>
          <div className={cls.about}>
            <TitleTag Tag="h3" title="About" className={cls.title} />
            <div className={cls.descriptionList}>{descriptionList}</div>
          </div>
          <div className={cls.techSpecks}>
            <TitleTag Tag="h3" title="Tech specs" className={cls.title} />
            <TechSpecs techSpecs={techSpecs} size={TechSpecsSize.M} />
          </div>
        </div>
      )}
    </Section>
  );
});
