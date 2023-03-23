import React from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.scss';
import Home from './views/Home';
import Layout from './views/Layout';
import Profile from './views/Profile';
import Single from './views/Single';
const App = () => {
  return (
    // eslint-disable-next-line no-undef
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/single" element={<Single />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
