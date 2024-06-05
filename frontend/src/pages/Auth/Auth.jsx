import { useState } from 'react';
import './Auth.css';

function Auth() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="Auth-container">
      <h1>NetfliCS</h1>
      <form action="http://localhost:8000/login/password" method="post">
        <div>
          <label htmlFor="email">Login : </label>
          <input
            id="email"
            className="login-input"
            name="email"
            placeholder="Enter your login"
            type="text"
            autoComplete="email"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password : </label>
          <input
            id="password"
            className="password-input"
            name="password"
            placeholder="Enter your password"
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}

export default Auth;
