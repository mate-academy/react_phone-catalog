import style from './HeaderBottom.module.scss';
import { Slider } from './Slider';

export const HeaderBottom = () => {
  return (
    <div className={style.header_bottom}>
      <div className="container">
        <h1 className={style.title}>Welcome to Nice Gadgets store!</h1>
      </div>
      <Slider />
    </div>
  );
};
