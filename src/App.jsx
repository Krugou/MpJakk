import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.scss';
import Nav from './components/Nav';
import Home from './views/Home';
import Profile from './views/Profile';
import Single from './views/Single';

const App = () => {
  return (
    // eslint-disable-next-line no-undef
    <Router basename={import.meta.env.BASE_URL}>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/single" element={<Single />} />
      </Routes>
    </Router>
  );
};

export default App;
