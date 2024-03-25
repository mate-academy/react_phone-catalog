import style from './About.module.scss';

export const About = () => {
  return (
    <div className={style.container}>
      <span className={style.container__title}>About</span>{' '}
      <div className={style.container__about}>
        <div className={style.container__about_item}>
          <h3 className={style.container__about_title}>
            And then there was Pro
          </h3>
          <p className={style.container__about_value}>
            A transformative triple‑camera system that adds tons of capability
            without complexity.
          </p>{' '}
          <p className={style.container__about_value}>
            {' '}
            An unprecedented leap in battery life. And a mind‑blowing chip that
            doubles down on machine learning and pushes the boundaries of what a
            smartphone can do. Welcome to the first iPhone powerful enough to be
            called Pro.
          </p>
        </div>

        <div className={style.container__about_item}>
          <h3 className={style.container__about_title}>Camera</h3>
          <p className={style.container__about_value}>
            Meet the first triple‑camera system to combine cutting‑edge
            technology with the legendary simplicity of iPhone. Capture up to
            four times more scene. Get beautiful images in drastically lower
            light. Shoot the highest‑quality video in a smartphone — then edit
            with the same tools you love for photos. You’ve never shot with
            anything like it.
          </p>{' '}
        </div>

        <div className={style.container__about_item}>
          <h3 className={style.container__about_title}>
            Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it.
            Love it.
          </h3>
          <p className={style.container__about_value}>
            iPhone 11 Pro lets you capture videos that are beautifully true to
            life, with greater detail and smoother motion. Epic processing power
            means it can shoot 4K video with extended dynamic range and
            cinematic video stabilization — all at 60 fps. You get more creative
            control, too, with four times more scene and powerful new editing
            tools to play with.
          </p>{' '}
        </div>
      </div>
    </div>
  );
};
