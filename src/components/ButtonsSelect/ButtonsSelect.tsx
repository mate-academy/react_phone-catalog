/* eslint-disable no-restricted-globals */
import { Link, useLocation } from 'react-router-dom';
import '../../styles/components/ButtonsSelect/ButtonsSelect.scss';
import { ChangeType, prepareLink } from '../../utils/routerService';
import { Button } from '../Button/Button';
import { useColors } from '../../utils/colors';

type Props = {
  title: string;
  type: string;
  contents: string[];
  activeContent: string,
};

export const ButtonsSelect: React.FC<Props> = ({
  title,
  type,
  contents,
  activeContent,
}) => {
  const colors = useColors();
  const location = useLocation();

  return (
    <div className="buttons">
      <h1 className="buttons__title">{title}</h1>

      <div className="buttons__buttons-container">
        {type === 'color' ? (
          contents.map(content => (
            <div className="buttons__button-container" key={content}>
              <Link
                to={prepareLink(location.pathname, ChangeType.COLOR, content)}
                state={{
                  path: location.pathname,
                  loaderOff: true,
                  prevPath: location.state.prevPath,
                }}
                replace
              >
                <Button
                  content="color"
                  isActive={content === activeContent}
                >
                  <span style={{ background: colors.get(content) }} />
                </Button>
              </Link>
            </div>
          ))
        ) : (
          contents.map(content => (
            <div className="buttons__button-container" key={content}>
              <Link
                to={prepareLink(location.pathname,
                  ChangeType.CAPACITY, content)}
                state={{
                  path: location.pathname,
                  loaderOff: true,
                  prevPath: location.state.prevPath,
                }}
                replace
              >
                <Button
                  content="text"
                  isActive={content === activeContent}
                >
                  {content}
                </Button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
