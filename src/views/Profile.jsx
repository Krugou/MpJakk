import React, {useEffect, useState} from 'react';
import {useUser} from '../hooks/ApiHooks';
const Profile = () => {
  const [user, setUser] = useState({});
  const {getUser} = useUser();
  const fetchUser = async () => {
    const userData = await getUser(localStorage.getItem('token'));
    setUser(userData);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log(user);
  return (
    <>
      <h1>Profile details</h1>
      <ul>
        <li>User name: {user.username}</li>
        <li>Email: {user.email}</li>
        <li>Full name: {user.full_name}</li>
      </ul>
    </>
  );
};

export default Profile;
