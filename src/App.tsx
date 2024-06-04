import './App.scss';
import Button from './UI/Button/Button';
import svgHeart from './assets/icons/Favourites.svg';
import svgFilledHeart from './assets/icons/Favourites Filled.svg';

export const App = () => {
  return (
    <div>
      <h1>Buttons</h1>
      <div className="button-group">
        <Button type="number">1</Button>
        <Button type="number" state="selected">
          1
        </Button>

        <Button type="arrow">{'>'}</Button>
        <Button type="arrow" state="selected">
          {'>'}
        </Button>
        <Button type="arrow" state="disabled">
          {'>'}
        </Button>

        <Button type="radio" color="#EB5757" />
        <Button type="radio" color="#FFBF00" />
        <Button type="radio" color="#40E0D0" />
        <Button type="radio" color="#6495ED" />
        <Button type="radio" color="#9FE2BF" />
        <Button type="radio" color="#EB5757" state="selected" />

        <Button type="icon">
          <img src={svgHeart} alt="" />
        </Button>
        <Button type="icon" state="selected">
          <img src={svgHeart} alt="" />
        </Button>
        <Button type="icon" state="disabled">
          <img src={svgFilledHeart} alt="" />
        </Button>
      </div>

      <Button type="primary" state="selected">
        Primary
      </Button>

      <Button type="back">Return</Button>
    </div>
  );
};
