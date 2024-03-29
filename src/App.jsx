import React from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.scss';
import {MediaProvider} from './contexts/MediaContext';
import Home from './views/Home';
import Layout from './views/Layout';
import Login from './views/Login';
import Logout from './views/Logout';
import MyFiles from './views/MyFiles';
import Profile from './views/Profile';
import Single from './views/Single';
import Update from './views/Update';
import Upload from './views/Upload';

console.log('base', import.meta.env.BASE_URL);

const App = () => {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <MediaProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/single" element={<Single />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/myfiles" element={<MyFiles />} />
            <Route path="/update" element={<Update />} />
          </Route>
        </Routes>
      </MediaProvider>
    </Router>
  );
};

export default App;
