import PropTypes from 'prop-types';
import React from 'react';
import {mediaUrl} from '../utils/variables';
const MediaRow = ({file}) => {
  return (
    <tr>
      <td>
        <img src={mediaUrl + file.thumbnails.w160} alt={file.title} />
      </td>
      <td>
        <h4>{file.title}</h4>
        <p>{file.description}</p>
      </td>
      <td>
        <a href={mediaUrl + file.filename}>View</a>
      </td>
    </tr>
  );
};

MediaRow.propTypes = {
  file: PropTypes.object.isRequired,
};

export default MediaRow;
