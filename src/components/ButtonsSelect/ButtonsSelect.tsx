import '../../styles/components/ButtonsSelect/ButtonsSelect.scss';
import { Button } from '../Button/Button';

type Props = {
  title: string;
  type: string;
  contents: string[];
};

export const ButtonsSelect: React.FC<Props> = ({
  title,
  type,
  contents,
}) => {
  return (
    <div className="buttons">
      <h1 className="buttons__title">{title}</h1>

      <div className="buttons__buttons-container">
        {type === 'color' ? (
          contents.map(content => (
            <div className="buttons__button-container" key={content}>
              <Button content="color">
                <span style={{ background: content }} />
              </Button>
            </div>
          ))
        ) : (
          contents.map(content => (
            <div className="buttons__button-container" key={content}>
              <Button content="text" isSelect>
                {content}
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
