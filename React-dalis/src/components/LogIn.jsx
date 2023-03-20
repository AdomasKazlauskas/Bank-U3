import { useState, useContext } from "react";
import axios from "axios";
import Button from "./Button";
import { GlobalContext } from "../context/GlobalContext";
import { paths } from "../constants/routing";
import oakLogo from "../assets/oakLogo.png";

const LogIn = () => {
  const { setRoute, setAuthName } = useContext(GlobalContext);
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3003/login", { withCredentials: true })
  //     .then((res) => {
  //       console.log(res.data);
  //       if (res.data.status === "ok") {
  //         setUsername(res.data.name);
  //       }
  //     });
  // }, []);

  const login = () => {
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
          setRoute(paths.ACCOUNTS);
          setAuthName(true);
        } else {
          setError(true);
          setUsername(null);
        }
      });
  };

  return (
    <div className="login-manager">
      <div className="login-card">
        <div className="login-card-header">
          <span>{error ? "Login Error" : "Login"}</span>
        </div>
        <div className="login-body">
          <h5 className="login-name">
            {username ? (
              <span>Hello, {username}!</span>
            ) : (
              <span>Hello, guest!</span>
            )}
          </h5>
          <div className="login-credentials">
            <label className="login-label">Name</label>
            <input
              className="name-input"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="login-credentials">
            <label className="login-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
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
