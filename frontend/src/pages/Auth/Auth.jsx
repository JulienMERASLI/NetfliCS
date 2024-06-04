import { useState } from 'react';
import './Auth.css';

function Auth() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="Auth-container">
      <h1>NetfliCS</h1>
      <div>
        {' '}
        <p>Login : </p>
        <input
          className="login-input"
          placeholder="Enter your login"
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>

      <div>
        {' '}
        <p>Password : </p>
        <input
          className="password-input"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button>Connect</button>
    </div>
  );
}

export default Auth;
