import styles from './Slider.module.scss';

interface SliderProps {
  image: {
    img?: string;
    alt?: string;
    name?: string;
    text?: string;
    model: string;
    title: string;
    button: string;
    link: () => void;
    categorie?: string;
    id?: number;
  };
}

export const Slider = ({ image }: SliderProps) => {
  return (
    <div className={styles.containerFirst}>
      <div className={styles.boxTitle}>
        <div className={styles.containerTitle}>
          {<div className={styles.title}>{image.title}</div>}
          <div className={styles.smallText}>{image.text}</div>
        </div>
        <button className={styles.button} onClick={image.link}>
          {image.button}
        </button>
      </div>
      <div className={styles.box}>
        {image.name && <div className={styles.iphone}>{image.name}</div>}
        {image.model && <div className={styles.beyond}>{image.model}</div>}
        {image.img && <img src={image.img} alt={image.alt} />}
      </div>
    </div>
  );
};
