import { Link, useNavigation } from 'react-router-dom';
import './Header.css';
import { useEffect } from 'react';
import nProgress from 'nprogress';
import useFetchConnected from '../../Hook/useFetchConnected';

const Header = () => {
  const connected = useFetchConnected();

  // const navigation = useNavigation();

  // useEffect(() => {
  //   if (navigation.state === 'loading' || navigation.state === 'submitting') {
  //     nProgress.start();
  //   } else {
  //     nProgress.done();
  //   }
  // }, [navigation.state]);

  return (
    <div className="Header-container">
      <Link className="Link" to="/">
        Home
      </Link>
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
      <Link className="Link" to="/about">
        About
      </Link>
      {connected === true && (
        <form method="POST" action="http://localhost:8000/logout">
          <button className="Link">Logout</button>
        </form>
      )}
    </div>
  );
};

export default Header;
