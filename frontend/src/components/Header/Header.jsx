import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '/logo.png';
import { useEffect } from 'react';
import nprogress from 'nprogress';
import useFetchConnected from '../../Hook/useFetchConnected';

const Header = () => {
  const { connected, pseudo } = useFetchConnected();

  const location = useLocation();

  useEffect(() => {
    nprogress.start();
    nprogress.done();
  }, [location.pathname]);

  return (
    <div className="Header-container">
      <div className="logoContainer">
        <img src={logo} alt="logo" id="logo" />
      </div>
      <div className="Links-container">
        {connected === false && (
          <>
            <Link className="Link" to="/login">
              Login
            </Link>
            <Link className="Link" to="/users">
              Register
            </Link>
          </>
        )}
        {connected === true && (
          <>
            <Link className="Link" to="/">
              Home
            </Link>
            <form method="POST" action="http://localhost:8000/logout">
              <button className="Link">Logout</button>
            </form>
            <Link className="Link" to="/myList">
              {pseudo}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
