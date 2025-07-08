import styles from './About.module.scss';
export const About = ({ description }) => {
  return (
    <>
      <div className={styles.about}>
        <h3 className={styles.about__title}>About</h3>
        {description.map(info => (
          <div key={info.title}>
            <h4 className={styles.about__description}>{info.title}</h4>
            <p className={styles.about__content}>{info.text}</p>
          </div>
        ))}
      </div>
    </>
  );
};
