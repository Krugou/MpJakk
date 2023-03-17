import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.scss';
import Nav from './components/Nav';
import {MediaProvider} from './contexts/MediaContext';
import Home from './views/Home';
import Login from './views/Login';
import Logout from './views/Logout';
import Profile from './views/Profile';
import Single from './views/Single';

const App = () => {
  return (
    // eslint-disable-next-line no-undef
    <Router basename={import.meta.env.BASE_URL}>
      <MediaProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/single" element={<Single />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </MediaProvider>
    </Router>
  );
};

export default App;
