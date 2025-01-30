import { useAppSelector } from '../../../app/hooks';
import { DetailProduct } from '../../../features/types/DetailProduct';
import { TechSpecs } from '../../ui/TechSpecs';
import cl from './TextInfoArticle.module.scss';

type Props = {
  product: DetailProduct;
};

const textContent = {
  techSpecs: {
    title: {
      en: 'Tech specs',
      ua: 'Технічні характеристики',
    },
    screen: {
      en: 'Screen',
      ua: 'Екран',
    },
    resolution: {
      en: 'Resolution',
      ua: 'Роздільна здатність',
    },
    processor: {
      en: 'Processor',
      ua: 'Процесор',
    },
    ram: {
      en: 'RAM',
      ua: "Оперативна пам'ять",
    },
    memory: {
      en: 'Built-in memory',
      ua: "Вбудована пам'ять",
    },
    camera: {
      en: 'Camera',
      ua: 'Камера',
    },
    zoom: {
      en: 'Zoom',
      ua: 'Зум',
    },
    cell: {
      en: 'Cell',
      ua: 'Підтримка мереж',
    },
  },

  about: {
    title: {
      en: 'About',
      ua: 'Про товар',
    },
  },
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

  const { language } = useAppSelector(st => st.global);

  const specList = [
    [textContent.techSpecs.screen[language], screen],
    [textContent.techSpecs.resolution[language], resolution],
    [textContent.techSpecs.processor[language], processor],
    [textContent.techSpecs.ram[language], ram],
    [textContent.techSpecs.memory[language], capacity],
    [textContent.techSpecs.cell[language], cell.join(', ')], // because cell is strings array
    [textContent.techSpecs.camera[language], camera || '-'],
    [textContent.techSpecs.zoom[language], zoom || '-'],
  ];

  return (
    <article className={cl.textInfoArticle}>
      <section className={cl.textInfoArticle__sectionAbout}>
        <h3 className={cl.sectionTitle}>{textContent.about.title[language]}</h3>

        {description.map(deskr => (
          <div className={cl.descriptionContainer} key={deskr.title.en}>
            <h4 className={cl.descriptionContainer__title}>
              {deskr.title[language]}
            </h4>
            <p className={cl.descriptionContainer__text}>
              {deskr.text[language]}
            </p>
          </div>
        ))}
      </section>

      <section className={cl.textInfoArticle__sectionTech}>
        <h3 className={cl.sectionTitle}>
          {textContent.techSpecs.title[language]}
        </h3>
        <TechSpecs chars={specList} />
      </section>
    </article>
  );
};
