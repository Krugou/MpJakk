import {Card, CardContent, CardMedia, Typography} from '@mui/material';
import {useLocation} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';

const Single = () => {
  const {state} = useLocation();
  const file = state.file;
  let filters = '';
  let desc = '';
  let allData = {
    desc: file.description,
    filters: {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      sepia: 0,
    },
  };
  try {
    allData = JSON.parse(file.description);
    filters = allData.filters;
    desc = allData.desc;
  } catch (error) {}
  return (
    <>
      <Typography component="h1" variant="h3">
        {file.title}
      </Typography>
      <Card>
        <CardMedia
          component={'img'}
          src={mediaUrl + file.filename}
          title={file.title}
          style={{
            objectFit: 'cover',
            filter: `brightness(${filters.brightness}%)
          contrast(${filters.contrast}%)
          saturate(${filters.saturation}%)
          sepia(${filters.sepia}%)`,
          }}
        />
        <CardContent>
          <Typography variant="body1">{desc}</Typography>
        </CardContent>
      </Card>
    </>
  );
};

// TODO in the next task: add propType for location

export default Single;
