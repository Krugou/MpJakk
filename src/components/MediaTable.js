// import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {baseUrl} from '../utils/variables';
import MediaRow from './MediaRow';
console.log('🚀 ~ file: MediaTable.js:5 ~ baseUrl:', baseUrl);

const MediaTable = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const getMediaFetch = async () => {
    try {
      const mediaResponse = await fetch(baseUrl + 'media');
      const media = await mediaResponse.json();

      const allFiles = await Promise.all(
        media.map(async (file) => {
          const fileResponse = await fetch(`${baseUrl}media/${file.file_id}`);

          return await fileResponse.json();
        })
      );

      setMediaArray(allFiles);
    } catch (err) {
      console.log(err.message);
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
