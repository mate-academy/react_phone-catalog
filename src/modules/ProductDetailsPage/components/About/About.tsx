import classes from './About.module.scss';

type Description = {
  title: string;
  text: string[];
};

export const About = ({ description }: { description: Description[] }) => (
  <section className={classes.About}>
    <h3>About</h3>
    <div className={classes.About__content}>
      {description.map(article => (
        <div key={article.title}>
          <p className={classes.About__title}>{article.title}</p>
          <div className={classes['About__text-container']}>
            {article.text.map(text => (
              <p key={text.slice(0, 10)} className={classes.About__text}>
                {text}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);
