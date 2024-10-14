import { Button } from '../../../../components/Button/Button';
import { useTheme } from '../../../../components/Themes/ThemeProvider';
import { VECTOR_SVG } from '../../../../utils/SVG';
import { ListItemStyled, PaginationStyled } from './styled';

type Props = {
  total: number;
  perPage: string;
  currentPage: number;
  onPageChange: (value: number) => void;
};

const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const { theme } = useTheme();

  if (perPage === 'all' || total <= Number(perPage)) {
    return <></>;
  }

  const handleChangePage = (num: number) => {
    onPageChange(num);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const pageCount = Array.from(
    { length: Math.ceil(total / Number(perPage)) },
    (_, i) => i + 1,
  );

  const handleLeftClick = () => {
    if (currentPage !== 1) {
      handleChangePage(currentPage - 1);
    }
  };

  const handleRightClick = () => {
    if (currentPage < pageCount[pageCount.length - 1]) {
      handleChangePage(currentPage + 1);
    }
  };

  return (
    <PaginationStyled>
      <ListItemStyled>
        <Button
          variant={currentPage !== 1 ? 'white' : 'disabled'}
          onFunc={handleLeftClick}
          css="width: 40px; margin-right: 8px;"
        >
          <VECTOR_SVG variant="left" />
        </Button>
      </ListItemStyled>

      {pageCount.length <= 5 ? (
        <>
          {pageCount.map(item => (
            <ListItemStyled key={item}>
              <Button
                variant={currentPage === item ? 'dark' : 'pagination'}
                onFunc={() => currentPage !== item && handleChangePage(item)}
                css={`
                  width: 40px;
                  border-radius: ${theme.borderThreeRadius};
                `}
              >
                {item}
              </Button>
            </ListItemStyled>
          ))}
        </>
      ) : (
        <>
          <ListItemStyled>
            <Button
              variant={currentPage === 1 ? 'dark' : 'pagination'}
              onFunc={() => currentPage !== 1 && handleChangePage(1)}
              css={`
                width: 40px;
                border-radius: ${theme.borderThreeRadius};
              `}
            >
              1
            </Button>
          </ListItemStyled>

          {currentPage > 3 && <div style={{ alignSelf: 'end' }}>...</div>}

          {(() => {
            let startPage: number;
            let endPage: number;

            if (currentPage === 1 || currentPage === 2) {
              startPage = 2;
              endPage = 4;
            } else if (
              currentPage === pageCount[pageCount.length - 1] ||
              currentPage === pageCount[pageCount.length - 2]
            ) {
              startPage = pageCount[pageCount.length - 4];
              endPage = pageCount[pageCount.length - 2];
            } else {
              startPage = currentPage - 1;
              endPage = currentPage + 1;
            }

            return Array.from(
              { length: endPage - startPage + 1 },
              (_, i) => startPage + i,
            ).map(page => (
              <ListItemStyled key={page}>
                <Button
                  variant={currentPage === page ? 'dark' : 'pagination'}
                  onFunc={() => currentPage !== page && handleChangePage(page)}
                  css="width: 40px;"
                >
                  {page}
                </Button>
              </ListItemStyled>
            ));
          })()}

          {currentPage < pageCount[pageCount.length - 3] && (
            <div style={{ alignSelf: 'end' }}>...</div>
          )}

          <ListItemStyled>
            <Button
              variant={
                currentPage === pageCount[pageCount.length - 1]
                  ? 'dark'
                  : 'pagination'
              }
              onFunc={() =>
                currentPage !== pageCount[pageCount.length - 1] &&
                handleChangePage(pageCount[pageCount.length - 1])
              }
              css="width: 40px;"
            >
              {pageCount[pageCount.length - 1]}
            </Button>
          </ListItemStyled>
        </>
      )}

      <ListItemStyled>
        <Button
          variant={
            currentPage < pageCount[pageCount.length - 1] ? 'white' : 'disabled'
          }
          onFunc={handleRightClick}
          css="width: 40px; margin-left: 8px;"
        >
          <VECTOR_SVG variant="right" />
        </Button>
      </ListItemStyled>
    </PaginationStyled>
  );
};

export default Pagination;
