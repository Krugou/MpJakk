import PropTypes from 'prop-types';
import React from 'react';
import MediaRow from './MediaRow';

const MediaTable = ({mediaArray}) => {
  console.log(mediaArray);
  return (
    <table className="tableDefault">
      <tbody>
        {mediaArray.map((item, index) => {
          return <MediaRow key={index} file={item} />;
        })}
      </tbody>
    </table>
  );
};

MediaTable.propTypes = {
  mediaArray: PropTypes.array.isRequired,
};

export default MediaTable;
