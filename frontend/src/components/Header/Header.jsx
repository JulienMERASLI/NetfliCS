import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '/logo.png';
import { useEffect } from 'react';
import nprogress from 'nprogress';
import { useNavigate } from 'react-router-dom';
import useFetchConnected from '../../Hook/useFetchConnected';
import 'nprogress/nprogress.css';

const Header = () => {
  const { connected, pseudo } = useFetchConnected();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    nprogress.start();
    nprogress.done();
  }, [location.pathname]);

  return (
    <div className="Header-container">
      <button className="logoContainer" onClick={() => navigate('/')}>
        <img src={logo} alt="logo" id="logo" />
      </button>
      <div className="Links-container">
        {connected === false && (
          <>
            <Link className="Link" to="/login">
              Login
            </Link>
            <Link className="Link" to="/signup">
              Register
            </Link>
          </>
        )}
        {connected === true && (
          <>
            <Link className="Link" to="/">
              Home
            </Link>
            <form
              method="POST"
              action={`${import.meta.env.VITE_BACKEND_URL}/logout`}
            >
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
