import {useContext, useEffect, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {appId, baseUrl} from '../utils/variables';

const doFetch = async (url, options) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) {
    const message = json.error
      ? `${json.message}: ${json.error}`
      : json.message;
    throw new Error(message || response.statusText);
  }
  return json;
};

const useMedia = (myFilesOnly = false) => {
  const [mediaArray, setMediaArray] = useState([]);
  const {user, update} = useContext(MediaContext);
  const getMedia = async () => {
    try {
      let files = await useTag().getTag(appId);

      if (myFilesOnly) {
        files = files.filter((file) => file.user_id === user.user_id);
      }

      const filesWithThumbnail = await Promise.all(
        files.map(async (file) => {
          return await doFetch(baseUrl + 'media/' + file.file_id);
        })
      );
      setMediaArray(filesWithThumbnail);
    } catch (error) {
      console.error('getMedia', error.message);
    }
  };

  useEffect(() => {
    try {
      getMedia();
    } catch (error) {
      console.log(error.message);
    }
  }, [update]);

  const postMedia = async (data, token) => {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
      },
      body: data,
    };
    return await doFetch(baseUrl + 'media', options);
  };

  const deleteMedia = async (id, token) => {
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    return await doFetch(baseUrl + 'media/' + id, options);
  };

  const putMedia = async (id, data, token) => {
    const options = {
      method: 'PUT',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return await doFetch(baseUrl + 'media/' + id, options);
  };

  return {mediaArray, postMedia, deleteMedia, putMedia};
};

const useUser = () => {
  const postUser = async (inputs) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await doFetch(baseUrl + 'users', options);
  };

  const getUserByToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    return await doFetch(baseUrl + 'users/user', options);
  };

  const getCheckUser = async (username) => {
    const {available} = await doFetch(baseUrl + 'users/username/' + username);
    return available;
  };

  const getUser = async (id, token) => {
    const options = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    return await doFetch(baseUrl + 'users/' + id, options);
  };

  return {postUser, getUserByToken, getCheckUser, getUser};
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await doFetch(baseUrl + 'login', options);
  };
  return {postLogin};
};

const useTag = () => {
  const getTag = async (tag) => {
    const tagResult = await doFetch(baseUrl + 'tags/' + tag);
    if (tagResult.length > 0) {
      return tagResult;
    } else {
      throw new Error('Tag not found');
    }
  };

  const postTag = async (data, token) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return await doFetch(baseUrl + 'tags', fetchOptions);
  };

  return {getTag, postTag};
};

const useFavourite = () => {
  const postFavourite = async (data, token) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return await doFetch(baseUrl + 'favourites', fetchOptions);
  };

  const getFavourites = async (id) => {
    return await doFetch(baseUrl + 'favourites/file/' + id);
  };

  const deleteFavourite = async (id, token) => {
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    return await doFetch(baseUrl + 'favourites/file/' + id, options);
  };

  return {postFavourite, getFavourites, deleteFavourite};
};

export {useMedia, useUser, useAuthentication, useTag, useFavourite};
