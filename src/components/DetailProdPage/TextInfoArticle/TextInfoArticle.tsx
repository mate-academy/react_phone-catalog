import { DetailProduct } from '../../../features/types/DetailProduct';
import { TechSpecs } from '../../ui/TechSpecs';
import cl from './TextInfoArticle.module.scss';

type Props = {
  product: DetailProduct;
};

export const TextInfoArticle: React.FC<Props> = ({ product }) => {
  const {
    description,
    screen,
    resolution,
    processor,
    ram,
    capacity,
    camera,
    zoom,
    cell,
  } = product;

  const specList = [
    ['Screen', screen],
    ['Resolution', resolution],
    ['Processor', processor],
    ['RAM', ram],
    ['Built-in memory', capacity],
    ['Camera', camera],
    ['Zoom', zoom],
    ['Cell', cell.join(', ')], // because cell is strings array
  ];

  return (
    <article className={cl.textInfoArticle}>
      <section className={cl.textInfoArticle__sectionAbout}>
        <h3 className={cl.sectionTitle}>About</h3>
        {description.map(deskr => (
          <div className={cl.descriptionContainer} key={deskr.title}>
            <h4 className={cl.descriptionContainer__title}>{deskr.title}</h4>
            <p className={cl.descriptionContainer__text}>{deskr.text}</p>
          </div>
        ))}
      </section>

      <section className={cl.textInfoArticle__sectionTech}>
        <h3 className={cl.sectionTitle}>Tech specs</h3>
        <TechSpecs chars={specList} />
      </section>
    </article>
  );
};
