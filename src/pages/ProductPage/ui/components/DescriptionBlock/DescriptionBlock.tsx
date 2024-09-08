import { IProductDetailsDescription } from '../../../model/types/productDetails';
import cls from './descriptionBlock.module.scss';
import classNames from 'classnames';
import { TitleTag } from '../../../../../shared/ui/TitleTag';
import { TextBlock } from '../../../../../shared/ui/TextBlock';
import { memo } from 'react';

interface Props {
  className?: string;
  description: IProductDetailsDescription;
}

export const DescriptionBlock = memo(({ className, description }: Props) => {
  const { text, title } = description;

  return (
    <div className={classNames(cls.descriptionBlock, [className])}>
      <TitleTag Tag="h4" title={title} className={cls.title} />
      {text.map(item => (
        <TextBlock key={item} text={item} className={cls.text} />
      ))}
    </div>
  );
});
