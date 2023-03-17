import {useEffect, useState} from 'react';
import {baseUrl} from '../utils/variables';
const fetchJson = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (response.ok) {
      // If the API response contains an error object, use its `message` property
      // as the error message. Otherwise, use the generic error message.
      const message = json.error
        ? `${json.error} : ${json.message}`
        : json.message || 'Unknown error';

      throw new Error(message);
    }
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
};
const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const getMediaFetch = async () => {
    try {
      const media = await fetchJson(baseUrl + 'media');
      const allFiles = await Promise.all(
        media.map(async (file) => {
          return await fetchJson(`${baseUrl}media/${file.file_id}`);
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
  return {mediaArray};
};

export {useMedia};
