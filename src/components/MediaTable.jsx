// import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import MediaRow from './MediaRow';

const MediaTable = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const getMediaFetch = async () => {
    try {
      const response = await fetch('test.json');
      const data = await response.json();
      setMediaArray(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMediaFetch();
  }, []);

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

MediaTable.propTypes = {};

export default MediaTable;
