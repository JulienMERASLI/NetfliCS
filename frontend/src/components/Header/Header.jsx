import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './Header.css';

const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['connect.sid']);
  const navigate = useNavigate();
  console.log(cookies);
  function logout() {
    fetch('http://localhost:8000/logout', {
      method: 'POST',
    }).then((res) => {});
  }

  return (
    <div className="Header-container">
      <Link className="Link" to="/">
        Home
      </Link>
      <Link className="Link" to="/login">
        Login
      </Link>
      <Link className="Link" to="/users">
        Users
      </Link>
      <Link className="Link" to="/about">
        About
      </Link>
      <form method="POST" action='"http://localhost:8000/logout'>
        <button className="Link">Logout</button>
      </form>
    </div>
  );
};

export default Header;
