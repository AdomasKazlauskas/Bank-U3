import { useState, useEffect } from "react";
import axios from "axios";
import Button from "./Button";

const LogIn = () => {
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3003/login", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "ok") {
          setUsername(res.data.name);
        }
      });
  }, []);

  const login = (_) => {
    axios
      .post(
        "http://localhost:3003/login",
        { name, password },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "ok") {
          setUsername(res.data.name);
          setName("");
          setPassword("");
          setError(null);
        } else {
          setError(true);
          setUsername(null);
        }
      });
  };

  return (
    <div className="cookie-manager">
      <div className="cookie-card">
        <div className="cookie-card-header">
          {error ? <span>Login Error</span> : <span>Login</span>}
        </div>
        <div className="cookie-body">
          <h5 className="cookie-name">
            {username ? (
              <span>Hello, {username}</span>
            ) : (
              <span>Hello, guest</span>
            )}
          </h5>
          <div>
            <label className="card-label">Name</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            ></input>
          </div>
          <div>
            <label className="card-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            ></input>
          </div>
          <Button label="LOGIN" onClick={login}>
            LOGIN
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
