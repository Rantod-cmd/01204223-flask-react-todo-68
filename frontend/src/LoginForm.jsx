import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function LoginForm({loginUrl}) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
      });

      if (response.ok) {
        const data = await response.json();
        login(username, data.access_token);
        navigate("/");
      } else if (response.status === 401) {
        setErrorMessage("Login failed: Invalid username or password");
      }
    } catch (error) {
      setErrorMessage("Error logging in: " + error.message);
    }
  }

  return (
    <form onSubmit={(e) => {handleLogin(e)}}>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      Username: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br/>
      Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br/>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
