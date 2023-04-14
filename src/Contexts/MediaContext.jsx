import PropTypes from 'prop-types';
import React, {useState} from 'react';

const MediaContext = React.createContext();

const MediaProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [update, setUpdate] = useState(true);
  return (
    <MediaContext.Provider value={{user, setUser, update, setUpdate}}>
      {children}
    </MediaContext.Provider>
  );
};

MediaProvider.propTypes = {
  children: PropTypes.node,
};

export {MediaContext, MediaProvider};
