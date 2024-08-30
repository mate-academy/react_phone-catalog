import { Box, Grid, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../../../../shared/GlobalContext/GlobalContext';

const ThumbnailContainer = styled('div')<{
  isActive: boolean;
  isSunSelected: boolean;
}>(({ isActive, isSunSelected }) => ({
  width: '80px',
  height: '80px',
  border: `1px solid ${isSunSelected ? (isActive ? '#000' : '#E2E6E9') : isActive ? '#fff' : 'transparent'}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    borderColor: isSunSelected ? '#89939A' : isActive ? '#fff' : 'transparent',
  },

  '@media (max-width: 900px)': {
    width: '55px',
    height: '55px',
  },
}));

const Thumbnail = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  objectPosition: 'center',
});

const MainImage = styled('img')({
  maxWidth: '464px',
  maxHeight: '464px',
  objectFit: 'contain',
  objectPosition: 'center',
  margin: '0 auto',

  '@media (max-width: 900px)': {
    maxWidth: '287px',
    maxHeight: '287px',
    marginBottom: '200px',
  },
  '@media (max-width: 640px)': {
    maxWidth: '100%',
    maxHeight: 'auto',
    marginBottom: '16px',
  },
});

export const ImageSlider = ({ images = [] }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    images[0],
  );
  const { isSunSelected } = useContext(GlobalContext);

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  if (images.length === 0) {
    return <div>No images available</div>;
  }

  return (
    <Box
      width="50%"
      display="flex"
      justifyContent="start"
      sx={{
        '@media (max-width: 640px)': {
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
        },
      }}
    >
      <Grid
        container
        spacing={2}
        maxWidth="560px"
        sx={{
          '@media (max-width: 640px)': {
            flexDirection: 'column',
            alignItems: 'center',
          },
        }}
      >
        <Grid
          item
          xs={2}
          sx={{
            '@media (max-width: 640px)': {
              order: 2,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
            },
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="start"
            sx={{
              '@media (max-width: 640px)': {
                flexDirection: 'row',
                justifyContent: 'center',
              },
            }}
          >
            {images.map((image, index) => (
              <IconButton
                key={index}
                onClick={() => setSelectedImage(image)}
                style={{ padding: 0, margin: '5px' }}
              >
                <ThumbnailContainer
                  isActive={selectedImage === image}
                  isSunSelected={isSunSelected}
                >
                  <Thumbnail src={image} alt={`Thumbnail ${index}`} />
                </ThumbnailContainer>
              </IconButton>
            ))}
          </Box>
        </Grid>
        <Grid
          item
          xs={10}
          display="flex"
          justifyContent="start"
          alignItems="flex-end"
          sx={{
            '@media (max-width: 640px)': {
              order: 1,
              width: '100%',
              justifyContent: 'center',
            },
          }}
        >
          {selectedImage && <MainImage src={selectedImage} alt="Main" />}
        </Grid>
      </Grid>
    </Box>
  );
};
