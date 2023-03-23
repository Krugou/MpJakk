import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.scss';
import {MediaProvider} from './contexts/MediaContext';
import Home from './views/Home';
import Layout from './views/Layout';
import Login from './views/Login';
import Logout from './views/Logout';
import Profile from './views/Profile';
import Single from './views/Single';
import React from 'react';

const App = () => {
  return (
    // eslint-disable-next-line no-undef
    <Router basename={import.meta.env.BASE_URL}>
      <MediaProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/single" element={<Single />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </MediaProvider>
    </Router>
  );
};

export default App;
