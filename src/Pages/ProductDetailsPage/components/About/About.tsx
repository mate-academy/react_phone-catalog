// About.tsx
import styles from './About.module.scss';

// 1. Описуємо тип одного блоку опису
interface DescriptionBlock {
  title: string;
  text: string[];
}

// 2. Описуємо пропси компонента (чекаємо масив опису)
interface AboutProps {
  description: DescriptionBlock[];
}

export const About = ({ description }: AboutProps) => {
  return (
    <section className={styles.about}>
      <h3 className={styles.title}>About</h3>
      <div className={styles.line}></div>
      <div className={styles.blockText}>
        {/* Зовнішній map проходить по кожному блоку ("And then...", "Camera" тощо) */}
        {description.map(block => (
          <div key={block.title} className={styles.item}>
            <h4 className={styles.titleH4}>{block.title}</h4>

            <div className={styles.paragraph}>
              {/* Внутрішній map проходить по масиву текстів усередині ПОТОЧНОГО блоку */}
              {block.text.map((paragraphText, index) => (
                <p key={index} className={styles.text}>
                  {paragraphText}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
