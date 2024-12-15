import './HeaderBottom.scss';
import { Slider } from '../Slider/Slider';

export const HeaderBottom = () => {
  return (
    <div className='header-bottom'>
      <div className="container">
        <h1 className='header-bottom-title'>
        Welcome to Nice Gadgets store!
        </h1>
      </div>
      <Slider />
    </div>

  )
}