import {Box} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const Upload = (props) => {
  return (
    <Box>
      <form>
        <input type="text" name="title" value="title"></input>
        <textarea name="textarea"></textarea>
        <input type="file" name="file" value="file"></input>
        <input type="submit" value="Submit"></input>
      </form>
    </Box>
  );
};

Upload.propTypes = {};

export default Upload;
