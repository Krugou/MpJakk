import {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import {MediaContext} from '../Contexts/MediaContext';

const Logout = () => {
  const [user, setUser] = useContext(MediaContext);
  setUser(null);
  localStorage.clear();
  return <>{!user ? <Navigate to="/" /> : <div>Loading...</div>}</>;
};

export default Logout;
